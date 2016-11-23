(function() {
  'use strict';

  console.log('app.js enter');

  angular.module('myFirstApp',[])
  .controller('MyFirstController', function($scope) {
    console.log('MyFirstController enter');

    $scope.name = 'there!';

  });

})();
