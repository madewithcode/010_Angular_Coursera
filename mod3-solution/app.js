(function () {

    // module
    var narrowItDownApp = angular.module('NarrowItDownApp', []);

    // constants
    narrowItDownApp.constant('ApiBasePath', ' https://davids-restaurant.herokuapp.com');

    // controller
    narrowItDownApp.controller('NarrowItDownController', NarrowItDownController);
    NarrowItDownController.$inject = ['MenuSearchService'];

    // service
    narrowItDownApp.service('MenuSearchService', MenuSearchService);
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    // directive
    narrowItDownApp.directive('foundItems', FoundItemsDirective);


    // controller function
    function NarrowItDownController(MenuSearchService) {

        var menu = this;

        menu.searchTerm = '';

        menu.narrowItDownForMe = function () {

            if (menu.searchTerm === '') {
                menu.foundItemsList = [];
                return;
            }

            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

            promise.then(function (response) {
                menu.foundItemsList = response;

            }).catch(function (error) {
                console.log(error);
            });
        }

        menu.removeItem = function(itemIndex) {
            menu.foundItemsList.splice(itemIndex, 1);
        }
    }

    // service function
    function MenuSearchService($http, ApiBasePath) {

        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            // reach out to server for list of all menu items
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json'),
            }).then(function (result) {

                var foundItems = [];

                // loop through menu items to find ones whose
                // description matches the searchTerm

                var menuItems = result.data.menu_items;
                for (var i = 0; i < menuItems.length; i++) {

                    if (menuItems[i].description.indexOf(searchTerm) > -1) {
                        foundItems.push(menuItems[i]);
                    }
                }

                // return list of found items
                // wrapped in a promise
                return foundItems;
            });
        }

    }

    //directive function
    function FoundItemsDirective() {

        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                foundItemsList: '<',
                onRemove: '&onRemove'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true

        };

        return ddo;
    }

    // directive controller
    function FoundItemsDirectiveController() {
        console.log('FoundItemsDirectiveController');
        var list = this;
        list.isEmpty = function() {
            console.log('isEmpty()', list.foundItemsList.length === 0);
            return list.foundItemsList.length === 0;
        }
    }

}());