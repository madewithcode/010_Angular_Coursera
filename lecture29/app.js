(function () {
    'use strict';

    var app = angular.module('ShoppingListDirectiveApp', []);

    app.controller('ShoppingListController', ShoppingListController);
    app.factory('ShoppingListFactory', ShoppingListFactory);
    app.directive('shoppingList', ShoppingListDirective);

    ShoppingListController.$inject = ['ShoppingListFactory'];

    function ShoppingListController(ShoppingListFactory) {
        console.log('ShoppingListController()');
        var listA = this;

        // use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();

        listA.items = shoppingList.getItems();
        var origTitle = '#1';
        listA.title = origTitle + ' ' + listA.items.length + ' items';

        listA.itemName = '';
        listA.itemQuantity = '';

        listA.addItem = function () {
            //console.log('ShoppingListController addItem()');
            shoppingList.addItem(listA.itemName, listA.itemQuantity);
            listA.title = origTitle + ' ' + listA.items.length + ' items';
        };

        listA.removeItem = function (itemIndex) {
            //console.log('ShoppingListController removeItem()');
            shoppingList.removeItem(itemIndex);
            listA.title = origTitle + ' ' + listA.items.length + ' items';
        };

    }

    // service
    function ShoppingListService(maxItems) {
        console.log('ShoppingListService()');

        var service = this;

        // list of shopping items
        var items = [];

        service.addItem = function (itemName, quantity) {
            //console.log('ShoppingListService addItem()');

            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {

                var item = {
                    name: itemName,
                    quantity: quantity
                };

                items.push(item);
                //console.log('ShoppingListService addItem() success');

            } else {
                //console.log('ShoppingListService addItem() error');
                throw new Error('Max items (' + maxItems + ') reached.');

            }

        };

        service.removeItem = function (itemIndex) {
            //console.log('ShoppingListService removeItem()');
            items.splice(itemIndex, 1);

        };

        service.getItems = function () {
            //console.log('ShoppingListService getItems()');
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

    // directive definition
    function ShoppingListDirective() {
        console.log('ShoppingListDirective()');

        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                title: '@'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'listD',
            bindToController: true
        };

        return ddo;
    }

    // directive controller function definition
    function ShoppingListDirectiveController() {
        console.log('ShoppingListDirectiveController()');

        var listC = this;

        listC.cookiesInList = function() {
            for (var i = 0; i < listC.items.length; i++) {
                var name = listC.items[i].name;
                if (name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
            }
            return false;
        };



    }

})();
