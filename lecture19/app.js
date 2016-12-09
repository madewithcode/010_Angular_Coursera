(function() {
  'use strict';

  // module
  var controllerApp = angular.module('ControllerApp', []);
  console.log('ControllerApp module created');

  // controller
  controllerApp.controller('ParentController1', ParentController1);
  controllerApp.controller('ChildController1', ChildController1);
  controllerApp.controller('ParentController2', ParentController2);
  controllerApp.controller('ChildController2', ChildController2);


  // inject
  ParentController1.$inject = ['$scope'];
  ChildController1.$inject = ['$scope'];
  ChildController2.$inject = ['$scope'];

  // controller function
  function ParentController1($scope) {
    console.log('ParentController1()');
    $scope.parentValue = 1;
    $scope.pc = this;
    $scope.pc.parentValue = 1;
  }

  function ChildController1($scope) {
    console.log('ChildController1()');
    // console.log('- $scope.parentValue: ', $scope.parentValue);
    // console.log('- CHILD $scope: ', $scope);
    // console.log('----------');
    //
    // $scope.parentValue = 5;
    // console.log('- *** CHANGED: $scope.parentValue = 5 ***');
    // console.log('- $scope.parentValue: ', $scope.parentValue);
    // console.log('- CHILD $scope: ', $scope);
    // console.log('----------');
    //
    // console.log('- $scope.pc.parentValue: ', $scope.pc.parentValue);
    // $scope.pc.parentValue = 5;
    // console.log('- *** CHANGED: $scope.pc.parentValue = 5 ***');
    // console.log('- $scope.pc.parentValue: ', $scope.pc.parentValue);
    // console.log('- $CHILD $scope: ', $scope);
    // console.log('----------');

    // console.log('- $scope.$parent.parentValue: ' + $scope.$parent.parentValue);


  }

  // don't need $scope in the controllerAs syntax
  // unless explicitly using $scope in the body 
  function ParentController2() {
    console.log('ParentController2()');
    var parent = this;
    parent.value = 1;
  }

  function ChildController2($scope) {
    console.log('ChildController2()');
    var child = this;
    child.value = 5;
  }



})();
