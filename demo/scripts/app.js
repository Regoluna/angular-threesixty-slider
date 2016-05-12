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
  .module('threesixtyDemo', ['reg.threeSixty'])
    .controller('MainCtrl', [ '$scope', function ($scope) {

      $scope.imageList = [];

      for( var i=1; i<47; i++ ){
        $scope.imageList.push( 'images/' + i + '.jpg' );
      }

    }]);
