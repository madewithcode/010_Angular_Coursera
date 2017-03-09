(function () {
    'use strict';

    var app = angular.module('ShoppingListDirectiveApp', []);

    app.controller('ShoppingListController', ShoppingListController);
    app.factory('ShoppingListFactory', ShoppingListFactory);
    app.directive('shoppingList', ShoppingListDirective);

    ShoppingListController.$inject = ['ShoppingListFactory'];

    function ShoppingListController(ShoppingListFactory) {
        // console.log('ShoppingListController()');
        var list = this;

        var foo = 'hello world';

        // use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();
        var origTitle = '#1';
        list.title = origTitle + ' ' + list.items.length + ' items';

        list.itemName = '';
        list.itemQuantity = '';

        list.addItem = function () {
            //console.log('ShoppingListController addItem()');
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + ' ' + list.items.length + ' items';
        };

        list.removeItem = function (itemIndex) {
            //console.log('ShoppingListController removeItem()');
            // console.log('this is : ', this);
            this.lastRemoved = 'last item removed was ' + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + ' ' + list.items.length + ' items';
        };

    }

    // service
    function ShoppingListService(maxItems) {
        // console.log('ShoppingListService()');

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
            // console.log('ShoppingListService removeItem()');
            items.splice(itemIndex, 1);

        };

        service.getItems = function () {
            //console.log('ShoppingListService getItems()');
            return items;
        };

    }

    // factory (produces a service)
    function ShoppingListFactory() {
        // console.log('ShoppingListFactory()');

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
                items: '<items',
                title: '@title',
                badRemove: '=badRemove',
                onRemove: '&onRemove'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink
        };

        return ddo;
    }

    function ShoppingListDirectiveLink(scope, element, attrs, controller) {
        console.log('ShoppingListDirectiveLink()');

        scope.$watch('list.cookiesInList()', function(newValue, oldValue) {
            console.log('oldValue: ', oldValue);
            console.log('newValue: ', newValue);

            if (newValue === true) {
                displayCookieWarning();
            } else {
                removeCookieWarning();
            }
        });

        function displayCookieWarning() {

            var warningElem = element.find('div');
            warningElem.css('display', 'block');

        }

        function removeCookieWarning() {
            var warningElem = element.find('div');
            warningElem.css('display', 'none');
        }
    }

    // directive controller function definition
    function ShoppingListDirectiveController() {
        // console.log('ShoppingListDirectiveController()');

        var list = this;

        list.cookiesInList = function() {
            for (var i = 0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
            }
            return false;
        };



    }

})();
