(function() {
  'use strict';
  console.log('app.js enter');

  angular.module('DIApp', [])
  .controller('DIController', DIController);

  function DIController ($scope, $filter, $injector) {
    console.log('DIController enter');

    $scope.name = 'foobar';

    $scope.upper = function() {
      console.log('upper()');

      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };
    
    // annotate the aruguments to DIContoller
    console.log($injector.annotate(DIController));
  }


})();
