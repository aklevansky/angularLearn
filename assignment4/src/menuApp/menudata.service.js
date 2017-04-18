;
(function() {
	'use strict';

	angular.module('data')
		.service('MenuDataService', MenuDataService)
		.constant('restaurantServer', 'https://davids-restaurant.herokuapp.com/');

	MenuDataService.$inject = ['$http', 'restaurantServer'];

	function MenuDataService($http, restaurantServer) {
		let service = this;

		// this method returns a promise which is a result of using the `$http` service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
		service.getAllCategories = getAllCategories;
		// this method returns a promise which is a result of using the `$http` service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category= + `categoryShortName`
		service.getItemsForCategory = getItemsForCategory;

		function getAllCategories() {
			return $http({
				url: restaurantServer + 'categories.json'
			});
		}

		function getItemsForCategory(categoryShortName) {
			return $http({
				url: restaurantServer + 'menu_items.json?category=' + categoryShortName
			});
		}

	}

})();