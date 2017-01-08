(function() {
  'use strict';

  // module
  var shoppingListApp = angular.module('ShoppingListApp', []);
  console.log('shoppingListApp module created');

  // controller
  shoppingListApp.controller('ShoppingListController', ShoppingListController);

  // provider
  shoppingListApp.provider('ShoppingListService', ShoppingListServiceProviderFunction);

  // config of the provider
  shoppingListApp.config(Config);

  // inject 'ShoppingListService' followed by word 'Provider'
  Config.$inject = ['ShoppingListServiceProvider'];

  // Config function
  function Config(ShoppingListServiceProvider) {
    console.log('Config()');
    ShoppingListServiceProvider.defaults.maxItems = 2;
  }

  // inject
  ShoppingListController.$inject = ['ShoppingListService'];

  // controller function
  function ShoppingListController(ShoppingListService) {
    console.log('ShoppingListController()');

    var list = this;

    list.items = ShoppingListService.getItems();

    list.itemName = '';
    list.itemQuantity = '';

    list.addItem = function() {
      console.log('ShoppingListController addItem()');
      try {
        ShoppingListService.addItem(list.itemName, list.itemQuantity);
      } catch (error) {
        list.errorMessage = error.message;
      }
    };

    list.removeItem = function(itemIndex) {
      console.log('ShoppingListController removeItem()');
      ShoppingListService.removeItem(itemIndex);
    };
  }

  // if not specified, maxItems assumed unlimited
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

  // provider (produces a service)
  function ShoppingListServiceProviderFunction() {
    console.log('ShoppingListServiceProviderFunction()');
    var provider = this;

    provider.defaults = {
      maxItems: 10
    };

    provider.$get = function() {
      console.log('ShoppingListServiceProviderFunction() $get()');
      var shoppingList = new ShoppingListService(provider.defaults.maxItems);
      return shoppingList;
    };

  }


})();
