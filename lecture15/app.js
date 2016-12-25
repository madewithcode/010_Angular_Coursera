(function() {
  'use strict';

  // module
  var counterApp = angular.module('CounterApp', []);

  // controller
  counterApp.controller('CounterController', counterController);

  // inject
  counterController.$inject = ['$scope'];

  // controller function
  function counterController($scope) {
    console.log('counterController() ...');

    $scope.counter = 0;

    // using $digest
    // $scope.upCounter = function() {
    //   console.log('upCounter() ...');
    //   console.log('$scope.counter: ' + $scope.counter);
    //   setTimeout(function() {
    //     $scope.counter++;
    //     console.log('- counter incremented');
    //     $scope.$digest(); // manually kick off digest
    //   }, 2000);
    //   console.log('$scope.counter: ' + $scope.counter);
    //   console.log('... upCounter()');
    // };

    // using $apply
    $scope.upCounter = function() {
      console.log('upCounter() ...');
      console.log('$scope.counter: ' + $scope.counter);
      setTimeout(function() {
        $scope.counter++;
        console.log('- counter incremented');
        $scope.$digest(); // manually kick off digest
      }, 2000);
      console.log('$scope.counter: ' + $scope.counter);
      console.log('... upCounter()');
    };


    console.log('... counterController()')
  }

})();
