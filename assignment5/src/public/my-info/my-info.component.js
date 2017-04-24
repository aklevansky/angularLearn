;(function() {
	'use strict';

	angular.module('public')
	.component('myInfo', {
		templateUrl: 'src/public/my-info/my-info.html',
		controller: CurrentUserInfoController,
		controllerAs: 'CurrentUserInfoCtrl'
	});

	CurrentUserInfoController.$inject = ['CurrentUserService', 'ApiPath'];
	function CurrentUserInfoController(CurrentUserService, ApiPath) {
		let CurrentUserInfoCtrl = this;

		CurrentUserInfoCtrl.user = CurrentUserService.getUserData();

		if (!CurrentUserInfoCtrl.user) {
			CurrentUserInfoCtrl.noData = true;
		} else {
			CurrentUserInfoCtrl.noData = false;
			CurrentUserInfoCtrl.basePath =  ApiPath;
			console.log(CurrentUserInfoCtrl.user);
		}
	}

})();