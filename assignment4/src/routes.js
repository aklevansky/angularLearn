;(function(){
'use strict';
	angular.module('menuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function RoutesConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'src/menuApp/templates/homePage.template.html'
		})
		.state('categories', {
			url: '/categories',
			templateUrl: 'src/menuApp/templates/categoriesPage.template.html',
			controller: 'CategoriesListController as categoriesList',
			resolve: {
				categories: ['MenuDataService', function(MenuDataService) {
					return MenuDataService.getAllCategories();
				}]
			}
		})

		.state('items', {
			url: '/items/{itemShort}',
			templateUrl: 'src/menuApp/templates/itemsPage.template.html',
			controller: 'itemDetailsController as itemDetails',
			resolve: {
				item: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
					return MenuDataService.getItemsForCategory($stateParams.itemShort);
				}]
			}
		})
	}
})();