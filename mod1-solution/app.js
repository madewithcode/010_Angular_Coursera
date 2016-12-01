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

      var lunchItems = $scope.lunchItems;
      console.log('- lunchItems: ' + lunchItems);
      console.log('- lunchItems.length: ' + lunchItems.length);

      if (lunchItems.length === 0) {
        // nothing entered
        $scope.outputMessage = 'Please enter data first';
        return;
      }

      var splitLunchItems = lunchItems.split(',');

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
