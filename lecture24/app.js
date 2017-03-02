(function () {
    'use strict';

    // module
    var shoppingListPromiseApp = angular.module('ShoppingListPromiseApp', []);
    console.log('ShoppingListPromiseApp module created');
    
    // declare ShoppingListController
    shoppingListPromiseApp.controller('ShoppingListController', ShoppingListController);
    
    // ShoppingListController injection
    ShoppingListController.$inject = ['ShoppingListService'];
    
    // ShoppingListController core function  
    function ShoppingListController(ShoppingListService) {
        console.log('ShoppingListController()');
        
        var list = this;
        
        list.items = ShoppingListService.getItems();
        list.itemName = '';
        list.itemQuantity = '';
        
        list.addItem = function() {
            console.log('- ShoppingListController() addItem()');
            ShoppingListService.addItem(list.itemName, list.itemQuantity);
        }
        
        list.removeItem = function(itemIndex) {
            console.log('- ShoppingListController() removeItem()');
            ShoppingListService.removeItem()
        }
        
    }
    
    // delcare ShoppingListService 
    shoppingListPromiseApp.service('ShoppingListService', ShoppingListService);
    
    // ShoppingListService injection 
    ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
    
    // ShoppingListService core function 
    function ShoppingListService($q, WeightLossFilterService) {
        console.log('ShoppingListService()');
        
        var service = this;
        
        // list of shopping items
        var items = [];
        
        /* not an optimized way
        service.addItem = function (name, quantity) {
            console.log('- ShoppingListService() addItem()');
            var promise = WeightLossFilterService.checkName(name);
            
            promise.then(function (response) {
                var nextPromise = WeightLossFilterService.checkQuantity(quantity);
                
                nextPromise.then(function (result) {
                    var item = {
                        name: name,
                        quantity: quantity
                    };
                    items.push(item);
                }, function (errorResponse) {
                    console.log(errorResponse.message);
                });
            }, function (errorResponse) {
                console.log(errorResponse.message);
            });
        };
        */
        
        // more optimized way
        /*
        service.addItem = function (name, quantity) {
            console.log('- ShoppingListService() addItem()');
            var promise = WeightLossFilterService.checkName(name);
            
            promise
            .then(function (response) {
                return WeightLossFilterService.checkQuantity(quantity);
            })
            .then(function (response) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                
                items.push(item);
            })
            .catch(function (errorResponse) {
                console.log(errorResponse.message);
            });
        };
        */
        
        // even more optimized way
        service.addItem = function(name, quantity) {
            console.log('- ShoppingListService() addItem()');
            
            var namePromise = WeightLossFilterService.checkName(name);
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
            
            $q.all([namePromise, quantityPromise]).
            then(function (response) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                
                items.push(item);
            })
            .catch(function (errorResponse) {
                console.log(errorResponse.message);
            });
        };
        
        service.removeItem = function (itemIndex) {
            console.log('- ShoppingListService() removeItem()');
            items.splice(itemIndex, 1);
        };
        
        service.getItems = function () {
            console.log('- ShoppingListService() getItems()');
            return items;
        };
        
    }
    
    // declare WeightLossFilterService 
    shoppingListPromiseApp.service('WeightLossFilterService', WeightLossFilterService);
    
    // WeightLossFilterService injection
    WeightLossFilterService.$inject = ['$q', '$timeout'];
    
    // WeightLossFilterService core function
    function WeightLossFilterService($q, $timeout) {
        console.log('WeightLossFilterService()');
        
        var service = this;
        
        service.checkName = function (name) {
            console.log('- WeightLossFilterService() checkName()');
            var deferred = $q.defer();
            
            var result = {
                message: ''
            };
            
            $timeout(function () {
                // check for cookies
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result);
                } else {
                    result.message = 'Stay away from cookies!';
                    deferred.reject(result);
                }
            }, 3000);
            
            return deferred.promise;  
        };
        
        service.checkQuantity = function (quantity) {
            console.log('- WeightLossFilterService() checkQuantity()');
            var deferred = $q.defer();
            
            var result = {
                message: ''
            };
            
            $timeout(function () {
                // check for too many boxes
                if (quantity < 6) {
                    deferred.resolve(result);
                } else {
                    result.message = 'that\'s too many boxes!';
                    deferred.reject(result);
                }
            }, 1000);
            
            return deferred.promise;
        };
    }

})();






















