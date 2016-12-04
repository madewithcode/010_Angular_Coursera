(function() {
  'use strict';

  // module
  var counterApp = angular.module('CounterApp', []);
  console.log('CounterApp module created');

  // controller
  counterApp.controller('CounterController', counterController);

  // inject
  counterController.$inject = ['$scope'];

  // controller function
  function counterController($scope) {
    console.log('counterController() ...');

    $scope.onceCounter = 0;
    $scope.counter = 0;
    $scope.name = 'hello';

    $scope.showNumberOfWatchers = function() {
      console.log('showNumberOfWatchers() ...');
      console.log('- $scope.$$watchersCount: ' + $scope.$$watchersCount);
      console.log('... showNumberOfWatchers()');
    };

    $scope.countOnce = function() {
      console.log('counterOnce() ...');
      $scope.onceCounter = 1;
      console.log('... counterOnce()');
    };

    $scope.upCounter = function() {
      console.log('upCounter() ...');
      $scope.counter++;
      console.log('... upCounter()');
    }

    // this is a way of seeing when the digest loop
    // gets fired
    $scope.$watch(function() {
      console.log('$scope.$watch()');
    });

    // $scope.$watch('onceCounter', function(newValue, oldValue) {
    //   console.log('$watch onceCounter ...');
    //   console.log('- onceCounter oldValue: ' + oldValue);
    //   console.log('- onceCounter newValue: ' + newValue);
    //   console.log('... $watch onceCounter');
    // });
    //
    // $scope.$watch('counter', function(newValue, oldValue) {
    //   console.log('$watch counter ...');
    //   console.log('- counter oldValue: ' + oldValue);
    //   console.log('- counter newValue: ' + newValue);
    //   console.log('... $watch counter');
    // });

    console.log('... counterController()')
  }

})();
