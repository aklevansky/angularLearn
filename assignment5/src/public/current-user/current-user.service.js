;(function() {
	angular.module('public')
	.service('CurrentUserService', CurrentUserService);

	function CurrentUserService() {
		let userData = this;

		let user;

		userData.getUserData = function() {
			return user;
		};

		userData.saveUserData = function(userDetails) {
			user = userDetails;
		};

	}

})();