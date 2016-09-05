'use strict';

/**
 * @ngdoc overview
 * @name threesixtyDemo
 * @description
 * # threesixtyDemo
 *
 * Main module of the application.
 */
angular
  .module('threesixtyDemo', ['reg.threesixty'])
    .controller('MainCtrl', [ '$scope', function ($scope) {

      var i;

      $scope.imageList = [];

      for( i=46; i>0; i-- ){
        $scope.imageList.push( 'images/' + i + '.jpg' );
      }

      $scope.animateThreeSixty = function() {
        $scope.$broadcast('threesixty-animate', 60);
      };

    }]);
