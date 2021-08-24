(function() {
    'use strict';

    angular.module('public').controller('SignUpController', SignUpController);
    SignUpController.$inject = ['MenuService'];

    function SignUpController(MenuService) {
        var $ctrl = this;

        $ctrl.user = {};
        $ctrl.favoriteDish = {};

        $ctrl.showError = false;
        $ctrl.showMessage = false;

        $ctrl.signUp = function(form) {
            $ctrl.showError = false;
            $ctrl.showMessage = false;

            if(form.$invalid) {
                console.log('The form is not valid');
                return;
            }

            MenuService.getFavoriteDish($ctrl.user.favoriteDish).then(function(response) {
                $ctrl.user.favoriteDishDetails = response.data;
                MenuService.saveUser($ctrl.user);
                $ctrl.showMessage = true;
            }, function(error) {
                console.log(error);
                $ctrl.showError = true;
            });
        }
    };
})();
