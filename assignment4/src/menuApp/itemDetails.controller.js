;(function() {
	'use strict';

	angular.module('menuApp')
	.controller('itemDetailsController', itemDetailsController);

	itemDetailsController.$inject = ['item'];
	function itemDetailsController(item) {
		let itemDetails = this;
		itemDetails.name = item.data.category.name;
		itemDetails.details = item.data.menu_items;
		console.log(itemDetails.details);
	}

})();