(function() {
  'use strict';
  console.log('app.js enter');

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    console.log('LunchCheckController()');

    $scope.lunchItems = '';
    $scope.outputMessage = '';

    $scope.checkIfTooMuch = function() {
      console.log('checkIfTooMuch()');

      var splitLunchItems = $scope.lunchItems.split(',');

      var numberOfLunchItems = splitLunchItems.length;
      console.log('- numberOfLunchItems: ' + numberOfLunchItems);

      if (numberOfLunchItems <=3) {
        $scope.outputMessage = 'Enjoy!';
      } else {
        $scope.outputMessage = 'Too much!';
      }

    }
  }
})();
