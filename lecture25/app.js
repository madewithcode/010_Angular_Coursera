(function() {
    console.log('app.js');
    
    // module
    var menuCategoriesApp = angular.module('MenuCategoriesApp', []);
    
    // controller
    menuCategoriesApp.controller('MenuCategoriesController', MenuCategoriesController);
    
    // service
    menuCategoriesApp.service('MenuCategoriesService', MenuCategoriesService);
    
    // constant
    menuCategoriesApp.constant('ApiBasePath', 'http://davids-restaurant.herokuapp.com');
    
    
    // inject service into controller
    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    
    // inject other services into our main service
    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    
    // controller function 
    function MenuCategoriesController(MenuCategoriesService) {
        console.log('MenuCategoriesController()');
        
        var menu = this;
        
        var promise = MenuCategoriesService.getMenuCategories();
        
        promise.then(function (response) {
            menu.categories = response.data;
        })
        .catch(function (error) {
            console.log('Something went wrong!');
        });
        
        menu.logMenuItems = function (shortName) {
            console.log('c:logMenuItems()');
            
            var promise = MenuCategoriesService.getMenuForCategory(shortName);
            
            promise.then(function (response) {
                console.log(response.data);    
            })
            .catch(function (error)  {
                console.log(error);
            });
        }
    }
    
    // service function
    function MenuCategoriesService($http, ApiBasePath) {
        console.log('MenuCategoriesService()');
        
        var service = this;
        
        service.getMenuCategories = function() {
            console.log('s:getMenuCategories()');
            var response = $http({
                method: 'GET',
                url: (ApiBasePath + '/categories.json')
            });
            return response;
        };
        
        service.getMenuForCategory = function(shortName) {
            console.log('s:getMenuForCategory()');
            
            var response = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json'),
                params: {
                    category: shortName
                }
            });
            
            return response;
        }
    };

    
})();