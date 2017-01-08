(function() {
  'use strict';

  // module
  var shoppingListCheckOff = angular.module('ShoppingListCheckOff', []);
  console.log('shoppingListCheckOff module created');

  // controller
  shoppingListCheckOff.controller('ToBuyController', ToBuyController);
  shoppingListCheckOff.controller('AlreadyBoughtController', AlreadyBoughtController);

  // service
  shoppingListCheckOff.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // inject
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];


  // controller function
  function ToBuyController(ShoppingListCheckOffService) {
    console.log('ToBuyController()');

    var tbc = this;

    tbc.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    tbc.boughtThisItem = function(itemIndex) {
      console.log('ToBuyController boughtThisItem()');
      ShoppingListCheckOffService.boughtThisItem(itemIndex);
    }

  }

  // controller function
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    console.log('AlreadyBoughtController()');

    var abc = this;
    abc.boughtItems = ShoppingListCheckOffService.getBoughtItems();

  }

  // service function
  function ShoppingListCheckOffService() {
    console.log('ShoppingListCheckOffService()');

    var service = this;

    var toBuyItems = [
      {name: 'coffee', quantity: 2},
      {name: 'tea', quantity: 1},
      {name: 'cookies', quantity: 2},
      {name: 'bread', quantity: 2},
      {name: 'candy', quantity: 5}
    ];

    var boughtItems = [];

    service.boughtThisItem = function(itemIndex) {
      console.log('ShoppingListCheckOffService boughtThisItem(): ' + itemIndex);

      var item = toBuyItems[itemIndex];
      boughtItems.push(item);

      toBuyItems.splice(itemIndex, 1);

    }

    service.getToBuyItems = function() {
      console.log('ShoppingListCheckOffService getToBuyItems()');
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      console.log('ShoppingListCheckOffService getBoughtItems()');
      return boughtItems;
    };

  }

})();
