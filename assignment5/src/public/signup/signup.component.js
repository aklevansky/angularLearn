;
(function() {
/*
Just core functionality is implemented, no styling etc.s
*/
	angular.module('public')
		.component('signupForm', {
			templateUrl: 'src/public/signup/signup-form.html',
			controller: SignUpController,
			controllerAs: 'SignUpCtrl'
		});


	SignUpController.$inject = ['CurrentUserService', 'MenuService'];

	function SignUpController(CurrentUserService, MenuService) {
		let SignUpCtrl = this;

		SignUpCtrl.noMenuItem = false; // used to display a warning message when the menu item does not exist

		SignUpCtrl.user = {};
		SignUpCtrl.submit = function() {
				CurrentUserService.saveUserData(SignUpCtrl.user);
				SignUpCtrl.success = true; // used to display a message that everything has been saved
		}

		SignUpCtrl.checkDish = function() {
			let item = MenuService.getItemDetails(SignUpCtrl.user.favDish);
			item.then((response) => {
				SignUpCtrl.user.favDishDetails = response.data;
				SignUpCtrl.noMenuItem = false;
			}, (reject) => {
				SignUpCtrl.noMenuItem = true;
			});


		}
	}

})();