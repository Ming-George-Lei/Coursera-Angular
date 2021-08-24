(function() {
    'use strict';

    angular.module('public').controller('InfoController', InfoController);
    InfoController.$inject = ['MenuService', 'ApiPath'];

    function InfoController(MenuService, ApiPath) {
        var $ctrl = this;
        $ctrl.apiPath = ApiPath;

        $ctrl.signedUp = false;

        $ctrl.user = MenuService.getUser();

        if (Object.entries($ctrl.user).length === 0 && $ctrl.user.constructor === Object) {
            $ctrl.signedUp = false;
        } else {
            $ctrl.signedUp = true;
        }
    };
})();
