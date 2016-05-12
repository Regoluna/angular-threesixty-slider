'use strict';

/**
 * @ngdoc directive
 * @name reg.threeSixty:regThreesixty
 * @description
 * # regThreesixty
 */
angular.module('reg.threeSixty', [])
  .directive('threesixty', ['$document',function ($document) {
    return {
      template: '<div class="reg-threesixty"></div>',
      restrict: 'E',
      replace:true,
      scope:{
        images: '='
      },
      link: function(scope, element, attrs) {

        var img;
        var currentFrame = 0;
        var endFrame;
        var ticker = 0;
        var totalFrames;
        var frames = [];
        var ready = false;
        var dragging;
        var pointerEndPosX;
        var pointerStartPosX;
        var pointerDistance;
        var monitorStartTime = 0;
        var monitorInt = 0;
        var speedMultiplier = -48;

        var initImages = function(){
          // Init images
          for( var i = 0 ; i < scope.images.length ; i++ ){
            img = new Image();
            element.append( img );
            frames.push(img);
            img.src = scope.images[ i ];
          }

          totalFrames = scope.images.length;

          // Activate first image
          if( frames.length > 0 ){
            frames[0].className = 'current';
          }
        };

        initImages();

        // Update images on model change
        scope.$watchCollection('images', function(){
          console.log('actualizando modelo', attrs);
          console.log( scope.images );
          initImages();
        });

        //
        var refresh = function () {
          if (ticker === 0) {
            ticker = setInterval(render, Math.round(1000 / 10));
          }
        };

        var getNormalizedCurrentFrame = function() {
          var c = -Math.ceil(currentFrame % totalFrames);
          if (c < 0) c += (totalFrames - 1);
          return c;
        };

        var hidePreviousFrame = function() {
          frames[getNormalizedCurrentFrame()].className = '';
        };

        var showCurrentFrame = function() {
          frames[getNormalizedCurrentFrame()].className = 'current';
        };


        var render = function() {
          if(currentFrame !== endFrame)
          {
            var frameEasing = endFrame < currentFrame ?
              Math.floor((endFrame - currentFrame) * 0.1) :
              Math.ceil((endFrame - currentFrame) * 0.1);
            hidePreviousFrame();
            currentFrame += frameEasing;
            showCurrentFrame();
          } else {
            window.clearInterval(ticker);
            ticker = 0;
          }
        };

        // start
        ready = true;
        endFrame = -totalFrames ;
        refresh();

        // Touch and Click events

        var getPointerEvent = function(event) {
            return event.targetTouches ? event.targetTouches[0] : event;
        };

        element.on('touchstart mousedown', mousedown);

        function mousedown (event) {
          event.preventDefault();
          pointerStartPosX = getPointerEvent(event).pageX;
          dragging = true;

          $document.on('touchmove mousemove', mousemove);
          $document.on('touchend mouseup', mouseup);
        };

        function trackPointer(event){
          if (ready && dragging) {

            pointerEndPosX = getPointerEvent(event).pageX;
            // console.log(pointerEndPosX);
            if(monitorStartTime < new Date().getTime() - monitorInt) {
              pointerDistance = pointerEndPosX - pointerStartPosX;
                console.log(pointerDistance);
              endFrame = currentFrame + Math.ceil((totalFrames - 1) * speedMultiplier * (pointerDistance / 600 ));
              refresh();
              monitorStartTime = new Date().getTime();
              pointerStartPosX = getPointerEvent(event).pageX;
            }
          }
        }

        function mouseup(event){
          event.preventDefault();
          dragging = false;
        }

        function mousemove(event){
          event.preventDefault();
          trackPointer(event);
        }



      }
    };
  }]);
