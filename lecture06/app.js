(function () {
  'use strict';
  console.log('app.js enter');

  angular.module('NameCalculator', [])
  .controller('NameCalculatorController', function ($scope) {
    console.log('NameCalculatorController enter');

    $scope.name = '';
    $scope.totalValue = 0;

    $scope.displayNumeric = function() {
      console.log('displayNumeric()');
      var totalNameValue = calculateNumericForString($scope.name); // get the total value
      $scope.totalValue = totalNameValue;
    }

    function calculateNumericForString(string) {
      var totalStringValue = 0;
      for (var i=0; i<string.length; i++) {
        totalStringValue += string.charCodeAt(i);
      }
      return totalStringValue;
    }

  });

})();
