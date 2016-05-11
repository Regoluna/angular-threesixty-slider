'use strict';

/**
 * @ngdoc function
 * @name threesixtyDemo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the threesixtyDemo
 */
angular.module('threesixtyDemo')
  .controller('MainCtrl', [ '$scope', function ($scope) {

    $scope.imageList = [];

    for( var i=1; i<47; i++ ){
      $scope.imageList.push( 'images/' + i + '.jpg' );
    }

  }]);
