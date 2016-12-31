(function() {
  'use strict';

  // module
  var shoppingListApp = angular.module('ShoppingListApp', []);
  console.log('ShoppingListApp module created');

  // controllers
  shoppingListApp.controller('ShoppingListAddController', ShoppingListAddController);
  shoppingListApp.controller('ShoppingListShowController', ShoppingListShowController);

  // services
  shoppingListApp.service('ShoppingListService', ShoppingListService);

  // injects
  ShoppingListAddController.$inject = ['ShoppingListService'];
  ShoppingListShowController.$inject = ['ShoppingListService'];

  // ShoppingListAddController function
  function ShoppingListAddController(ShoppingListService) {
    console.log('ShoppingListAddController()');
    var itemAdder = this;

    itemAdder.itemName = '';
    itemAdder.itemQuantity = '';

    itemAdder.addItem = function() {
      console.log('ShoppingListAddController addItem()');
      ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    }

  }

  // ShoppingListShowController function
  function ShoppingListShowController(ShoppingListService) {
    console.log('ShoppingListShowController()');
    var showList = this;

    showList.items = ShoppingListService.getItems();

    showList.removeItem = function(itemIndex) {
      console.log('ShoppingListShowController removeItem()');
      ShoppingListService.removeItem(itemIndex);
    }

  }

  // ShoppingListService function
  function ShoppingListService() {
    console.log('ShoppingListService()');
    var service = this;

    var items = [];

    service.addItem = function(itemName, itemQuantity) {
      console.log('ShoppingListService addItem()');
      var item = {
        name: itemName,
        quantity: itemQuantity
      }
      items.push(item);
      console.log(items);
    }

    service.removeItem = function(itemIndex) {
      console.log('ShoppingListService removeItem()');
      items.splice(itemIndex, 1);
    }

    service.getItems = function() {
      console.log('ShoppingListService getItems()');
      return items;
    }

  }

})();
