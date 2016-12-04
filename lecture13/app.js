(function() {
  'use strict';

  // create myApp module
  angular.module('myApp', []);
  console.log('myApp module created');

  // get myApp module and assign it to a var for easy access
  var myApp = angular.module('myApp');

  // create myController for myApp
  myApp.controller('myController', myController);

  // register a filter
  // step 2 of creating a factory function
  myApp.filter('cwf', changeWordFilter);
  myApp.filter('cawf', changeAnyWordFilter);

  // cwf is injected into controller,
  // so it can be used here inside JavaScript
  // cawf is used directly from HTML,
  // it therefore does not need to be injected in controller

  // in addition to the obvious $scope
  // inject any filter into controller where it will be used
  // step 3 of creating and using a factory function
  // note: 'Filter' is appended to 'cwf' by Angular
  // so a filter registered as 'cwf', needs to be injected
  // as 'cwfFilter'
  myController.$inject = ['$scope', 'cwfFilter'];


  // core definition of myController function
  function myController($scope, cwfFilter) {
    console.log('myController()');
    $scope.message = 'foo';


    $scope.doSomething = function() {
      console.log('doSomething()');
      $scope.message = cwfFilter($scope.message);
    };

  }

  // factory function
  // step 1 of creating a factory function
  function changeWordFilter() {
    console.log('changeWordFilter()');
    return function (input) {
      input = input || '';
      input = input.replace('foo', 'fooFooFoo');
      return input;
    };
  }

  function changeAnyWordFilter() {
    console.log('changeAnyWordFilter()');
    return function (input, target, replace) {
      input = input || '';
      input = input.replace(target, replace);
      return input;
    };
  }



})();
