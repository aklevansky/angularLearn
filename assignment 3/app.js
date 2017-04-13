(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', foundItemsDirective)
		.constant('serverAddress', 'https://davids-restaurant.herokuapp.com');

	NarrowItDownController.$inject = ['MenuSearchService'];

	function NarrowItDownController(MenuSearchService) {
		let narrow = this;

		narrow.searchTerm;

		narrow.narrowSearch = function() {
			// if user input empty
			if ( !narrow.searchTerm ) {
				narrow.found = [];
				return;
			}

			let promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
			promise.then((response) => {
					narrow.found = response;
				})
				// no special error handling
				.catch((error) => {
					narrow.found = '';
				});
		}

		narrow.removeItem = function(index) {
			narrow.found.splice(index, 1);
		}
	}

	MenuSearchService.$inject = ['$http', 'serverAddress'];

	function MenuSearchService($http, serverAddress) {
		return new function() {
			let searchService = this;


			/******
			a) reaches out to the server (using the $http service) to retrieve the list of all the menu items.
			b) loops through received menu items and picks out the ones whose description matches the searchTerm. 
			c) compiles the list and returns it (wrapped in a promise).
			*******/
			searchService.getMatchedMenuItems = function(itemToMatch) {

				let request = $http({
						url: serverAddress + '/menu_items.json'
					}).then((data) => {
						// to find all occurrences
						itemToMatch = itemToMatch.toLowerCase();

						let foundItems = [];
						foundItems = filterResponse(data.data.menu_items, itemToMatch);
						return foundItems;
					})
					// no special error handling
					.catch((error) => {
						return '';
					});

				return request;
			}

			// helper function where filtering takes place
			function filterResponse(menuItems, itemToMatch) {

				let filtered = menuItems.filter( (item) => {
					let description = item.description.toLowerCase();
					return description.includes(itemToMatch);
				} );

				return filtered;

			}
		}
	}


	// Found Items Directive
	function foundItemsDirective() {
		let ddo = {
			name: 'foundItems',
			restrict: 'E',
			templateUrl: 'foundItems.html',
			scope: {
				foundItems: '<',
				onRemove: '&'
			}
		};

		return ddo;
	}

})();