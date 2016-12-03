(function() {
  'use strict';

  // module
  var myApp = angular.module('myApp', []);
  console.log('myApp module created');

  // controller
  myApp.controller('myController', myController);

  // inject
  myController.$inject = ['$scope'];

  // controller function 
  function myController($scope) {
    console.log('myController()');
    $scope.message = 'hello, world!';
  }

})();
