;(function() {
	'use strict';

	angular.module('menuApp')
	.controller('CategoriesListController', CategoriesListController);

	CategoriesListController.$inject = ['categories'];
	function CategoriesListController(categories) {
		let categoriesList = this;
		categoriesList.categories = categories.data;
	}

})();