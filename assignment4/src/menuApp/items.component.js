;(function(){
	'use strict';

	angular.module('menuApp')
	.component('items', {
		templateUrl: 'src/menuApp/templates/items.component.html',
		bindings: {
			name: '<',
			details: '<'
		}
	});

})();