(function () {
    'use strict';

    // module
    var app = angular.module('ShoppingListDirectiveApp', []);
    console.log('ShoppingListDirectiveApp module created');

    // controller
    app.controller('ShoppingListController1', ShoppingListController1);
    app.controller('ShoppingListController2', ShoppingListController2);

    // factory
    app.factory('ShoppingListFactory', ShoppingListFactory);

    // directive
    app.directive('shoppingList', ShoppingList);

    // inject
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    ShoppingListController2.$inject = ['ShoppingListFactory'];

    // controller function for list1
    function ShoppingListController1(ShoppingListFactory) {
        console.log('ShoppingListController1()');
        var list = this;

        // use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();

        var origTitle = '#1';
        list.title = origTitle + ' (' + list.items.length + ' items)';

        list.itemName = '';
        list.itemQuantity = '';

        list.addItem = function () {
            console.log('ShoppingListController1 addItem()');
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + ' (' + list.items.length + ' items)';
        };

        list.removeItem = function (itemIndex) {
            console.log('ShoppingListController1 removeItem()');
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + ' (' + list.items.length + ' items)';
        }

    }

    // controller function for list2
    function ShoppingListController2(ShoppingListFactory) {
        console.log('ShoppingListController2()');
        var list = this;

        // use factory to create new shopping list service
        var shoppingList = ShoppingListFactory(3);

        list.items = shoppingList.getItems();

        list.itemName = '';
        list.itemQuantity = '';

        list.addItem = function () {
            console.log('ShoppingListController2 addItem()');
            try {
                shoppingList.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function (itemIndex) {
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

        service.addItem = function (itemName, quantity) {
            console.log('ShoppingListService addItem()');

            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {

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

        service.removeItem = function (itemIndex) {
            console.log('ShoppingListService removeItem()');
            items.splice(itemIndex, 1);

        };

        service.getItems = function () {
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

    // directive definitin
    function ShoppingList() {
        console.log('ShoppingList()');

        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                list: '=myList',
                title: '@title'
            }
        };

        return ddo;
    }


})();
