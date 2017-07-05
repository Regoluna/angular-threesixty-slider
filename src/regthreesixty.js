'use strict';

/**
 * @ngdoc directive
 * @name reg.threeSixty:regThreesixty
 * @description
 * # regThreesixty
 */
angular.module('reg.threesixty', [])
  .directive('threesixty', ['$document', '$window',function ($document, $window) {
    return {
      template: '<div class="reg-threesixty"></div>',
      restrict: 'E',
      replace:true,
      scope:{
        images: '=',
        reverse: '=',
        animateAfterLoading: '=',
        speedMultiplier: '='
      },
      link: function(scope, element, attrs) {

        var img;
        var imgList = scope.images;
        var slicedFrames = 0;
        var currentFrame = 0;
        var endFrame;
        var ticker = 0;
        var totalFrames;
        var loadedImages;
        var frames = [];
        var ready = false;
        var dragging;
        var pointerEndPosX;
        var pointerStartPosX;
        var pointerDistance;
        var monitorStartTime = 0;
        var monitorInt = 0;
        var speedMultiplier = scope.speedMultiplier ? parseInt(scope.speedMultiplier) : 20;
        var ROTATION_EVENT = 'threesixty-animate';

        var adjustHeight = function(){
          if( loadedImages > 0 ){
            var elementW = element[0].offsetWidth;
            var imageW = frames[0].width;
            var h = frames[0].naturalHeight * ( elementW / imageW );
            element.css( 'height' , h + 'px' );
          }
        };

        angular.element($window).on('resize', adjustHeight );

        var load360Images = function(){

          for( var i = 1 ; i < imgList.length ; i++ ){
            img = new Image();
            img.onload = imageReady;
            element.append( img );
            frames[i] = img;
            img.src = imgList[ i ];
          }

        };

        var imageReady = function( event ){
          loadedImages ++;
          if( loadedImages === totalFrames ){
            ready = true;
            // start
            endFrame = totalFrames;

            if (scope.animateAfterLoading) {
              refresh();
            }
          }
        };

        var firstImageReady = function(){
          // Remove previous images.
          element.find('img').remove();
          loadedImages ++;
          var firstImage = frames[0];
          firstImage.className = 'current';
          adjustHeight();
          element.append( firstImage );
          element.removeClass('loading-first');
          load360Images();
        };

        var initImages = function(){

          element.addClass('loading-first');

          frames = [];
          totalFrames = imgList.length;
          loadedImages = 0;

          if( totalFrames > 0 ){
            // Load first image
            img = new Image();
            img.onload = firstImageReady;
            img.src = imgList[ 0 ];
            frames.push(img);
          }

        };

        initImages();

        // Update images on model change
        // only if image list changes
        scope.$watchCollection('images', function( newImageList, oldImageList){

          slicedFrames += Math.abs(getNormalizedCurrentFrame());
          if (slicedFrames >= newImageList.length - 1) {
            slicedFrames -= newImageList.length;
          }

          var firstPart = newImageList.slice(0, slicedFrames);
          var lastPart = newImageList.slice(slicedFrames);

          imgList = lastPart.concat(firstPart);
          currentFrame = 0;
          if( newImageList.length != oldImageList.length ){
            initImages();
          }else{
            for (var i = 0; i < oldImageList.length; i++) {
              if( newImageList[ i ] !== oldImageList[ i ] ){
                initImages();
                break;
              }
            }
          }

        } );


        var refresh = function (animationSpeed) {

          if (ticker === 0) {
            ticker = setInterval(render, animationSpeed || Math.round(1000 / 30));
          }
        };

        var getNormalizedCurrentFrame = function() {
          var c = -Math.ceil(currentFrame % totalFrames);
          if (c < 0) {
            c += (totalFrames - 1);
          }
          return c;
        };

        var hidePreviousFrame = function() {
          frames[getNormalizedCurrentFrame()].className = '';
        };

        var showCurrentFrame = function() {
          frames[getNormalizedCurrentFrame()].className = 'current';
        };


        var render = function() {
          if( frames.length >0 && currentFrame !== endFrame){
            var frameEasing = endFrame < currentFrame ?
              Math.floor((endFrame - currentFrame) * 0.1) :
              Math.ceil((endFrame - currentFrame) * 0.1);
            hidePreviousFrame();
            currentFrame += frameEasing;
            showCurrentFrame();
          } else {
            $window.clearInterval(ticker);
            ticker = 0;
          }
        };

        // Touch and Click events

        var getPointerEvent = function(event) {
          return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
        };

        element.on('touchstart mousedown', mousedown);

        function mousedown (event) {
          event.preventDefault();
          pointerStartPosX = getPointerEvent(event).pageX;
          dragging = true;

          $document.on('touchmove mousemove', mousemove);
          $document.on('touchend mouseup', mouseup);
        }

        function trackPointer(event){
          if (ready && dragging) {

            pointerEndPosX = getPointerEvent(event).pageX;

            if(monitorStartTime < new Date().getTime() - monitorInt) {
              var frameDiff = 0,
                direction = scope.reverse? -1 : 1 ;

              pointerDistance = pointerEndPosX - pointerStartPosX;

              if(pointerDistance > 0){
                frameDiff = Math.ceil((totalFrames - 1) * speedMultiplier * (pointerDistance / element[0].clientWidth));
              }else{
                frameDiff = Math.floor((totalFrames - 1) * speedMultiplier * (pointerDistance / element[0].clientWidth));
              }

              endFrame = currentFrame + (direction * frameDiff);

              refresh();
              monitorStartTime = new Date().getTime();
              pointerStartPosX = getPointerEvent(event).pageX;
            }
          }
        }

        function mouseup(event){
          event.preventDefault();
          dragging = false;
          $document.off('touchmove mousemove', mousemove);
          $document.off('touchend mouseup', mouseup);
        }

        function mousemove(event){
          event.preventDefault();
          trackPointer(event);
        }

        scope.$on(ROTATION_EVENT, function(event, animationSpeed) {
          endFrame = currentFrame + totalFrames;
          refresh(animationSpeed);
        });

        scope.$on( '$destroy', function() {
          $document.off('touchmove mousemove', mousemove);
          $document.off('touchend mouseup', mouseup);
          angular.element($window).off('resize', adjustHeight );
        });

      }
    };
  }]);
