(function () {
    'use strict';
    console.log('app.js enter');

    // module
    var shoppingListCheckOff = angular.module('ShoppingListCheckOff', []);
    console.log('ShoppingListCheckOff module created');

    // controller
    shoppingListCheckOff.controller('ToBuyController', ToBuyController);
    shoppingListCheckOff.controller('AlreadyBoughtController', AlreadyBoughtController);

    // service
    shoppingListCheckOff.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // injects
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];


    // ToBuyController as tbc
    function ToBuyController(ShoppingListCheckOffService) {
        console.log('ToBuyController()');
        var tbc = this;
        
        tbc.itemsToBuy = ShoppingListCheckOffService.itemsToBuy;
        
        tbc.buyItem = function(itemIndex) {
            console.log('- ToBuyController buyItem(), itemIndex: ' + itemIndex);
            ShoppingListCheckOffService.buyItem(itemIndex);
        }
      
    }

    // AlreadyBoughtController as abc
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        console.log('AlreadyBoughtController()');
        var abc = this;
        
        abc.itemsAlreadyBought = ShoppingListCheckOffService.itemsAlreadyBought;
    }

    // ShoppingListCheckOffService
    function ShoppingListCheckOffService() {
        console.log('ShoppingListCheckOffService()');
        
        var slcos = this; 

        slcos.itemsToBuy = [
            {
                name: 'Cookies',
                quantity: 5
            },
            {
                name: 'Tea',
                quantity: 2
            },
            {
                name: 'Coke',
                quantity: 5
            },
            {
                name: 'Orange Juice',
                quantity: 2
            },
            {
                name: 'Ground Coffee',
                quantity: 1
            }
        ];

        slcos.itemsAlreadyBought = [];
        
        slcos.buyItem = function(itemIndex) {
            console.log('- ShoppingListCheckOffService buyItem(), itemIndex: ' + itemIndex);
            slcos.itemsAlreadyBought.push(slcos.itemsToBuy[itemIndex])
            slcos.itemsToBuy.splice(itemIndex, 1);
        }
    }


}());