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
    .controller('MainCtrl', [ '$scope', '$timeout', function ($scope,$timeout) {

      var list1 = [], list2 = [], i;

      $scope.imageList = [];
      $scope.list1 = list1;
      $scope.list2 = list2;

      for( i=1; i<25; i++ ){
        list1.push( 'images/' + i + '.jpg' );
      }

      for( i=26; i<47; i++ ){
        list2.push( 'images/' + i + '.jpg' );
      }

      $timeout( function(){
        $scope.imageList = list1;
      }, 200 );

      $timeout( function(){
        $scope.imageList = list2;
      }, 2000 );


    }]);
