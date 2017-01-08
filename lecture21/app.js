(function() {
  'use strict';

  // module
  var controllerAsApp = angular.module('ControllerAsApp', []);
  console.log('controllerAsApp module created');

  // controller
  controllerAsApp.controller('ShoppingListController1', ShoppingListController1);
  controllerAsApp.controller('ShoppingListController2', ShoppingListController2);

  // factory
  controllerAsApp.factory('ShoppingListFactory', ShoppingListFactory);

  // inject
  ShoppingListController1.$inject = ['ShoppingListFactory'];
  ShoppingListController2.$inject = ['ShoppingListFactory'];

  // controller function for list1
  function ShoppingListController1(ShoppingListFactory) {
    console.log('ShoppingListController1()');
    var list1 = this;

    // use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list1.items = shoppingList.getItems();

    list1.itemName = '';
    list1.itemQuantity = '';

    list1.addItem = function() {
      console.log('ShoppingListController1 addItem()');
      shoppingList.addItem(list1.itemName, list1.itemQuantity);
    };

    list1.removeItem = function(itemIndex) {
      console.log('ShoppingListController1 removeItem()');
      shoppingList.removeItem(itemIndex);
    }

  }

  // controller function for list2
  function ShoppingListController2(ShoppingListFactory) {
    console.log('ShoppingListController2()');
    var list2 = this;

    // use factory to create new shopping list service
    var shoppingList = ShoppingListFactory(3);

    list2.items = shoppingList.getItems();

    list2.itemName = '';
    list2.itemQuantity = '';

    list2.addItem = function() {
      console.log('ShoppingListController2 addItem()');
      try {
        shoppingList.addItem(list2.itemName, list2.itemQuantity);
      } catch (error) {
        list2.errorMessage = error.message;
      }
    };

    list2.removeItem = function(itemIndex) {
      console.log('ShoppingListController2 removeItem()');
      shoppingList.removeItem(itemIndex);
    }

  }

  // if not specific, maxItems assume unlimited
  function ShoppingListService(maxItems) {
    console.log('ShoppingListService()');

    var service = this;

    // list of shopping items
    var items = [];

    service.addItem = function(itemName, quantity) {
      console.log('ShoppingListService addItem()');

      if ( (maxItems === undefined) ||
           (maxItems !== undefined) && (items.length < maxItems) ) {

        var item = {
          name: itemName,
          quantity: quantity
        };

        items.push(item);
        console.log('ShoppingListService addItem() success');

      } else {
        console.log('ShoppingListService addItem() error');
        throw new Error('Max items (' + maxItems + ') reached.');

      }

    };

    service.removeItem = function(itemIndex) {
      console.log('ShoppingListService removeItem()');
      items.splice(itemIndex, 1);

    };

    service.getItems = function() {
      console.log('ShoppingListService getItems()');
      return items;
    };

  }

  // factory (produces a service)
  function ShoppingListFactory() {
    console.log('ShoppingListFactory()');

    // method 1
    // can be a function that creates something
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };

    // method 2
    // could be an object literal with a prop that's
    // a function that creates something
    // var factory = {
    //   getShoppingListService: function(maxItems) {
    //     return new ShoppingListService(maxItems);
    //   }
    // };

    return factory;


  }

})();
