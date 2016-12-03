(function() {
  'use strict';

  var myApp = angular.module('myApp', []);
  console.log('myApp module created');

  myApp.controller('myController', myController);

  myController.$inject = ['$scope'];

  function myController($scope) {
    console.log('myController()');
    $scope.message1 = 'foo';
  }

})();
