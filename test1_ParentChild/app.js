(function() {
  'use strict';

  // module
  var myApp = angular.module('myApp', []);
  console.log('myApp module created');

  // controller
  myApp.controller('myController1', myController1);
  myApp.controller('myController2', myController2);

  // inject
  myController1.$inject = ['$scope'];
  myController2.$inject = ['$scope'];

  // controller function
  function myController1($scope) {
    console.log('myController1()');
    $scope.c = 'i am controller 1';
    console.log($scope);
    console.log('-------------------------');
  }

  function myController2($scope) {
    console.log('myController2()');
    $scope.c = 'i am controller 2';
    console.log($scope);
    console.log('-------------------------');
  }


})();
