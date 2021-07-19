(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkLunch = function () {
    if ($scope.lunchMenu === ""){
      $scope.lunchCheckMessage = "Please enter data first";
      return;
    }
    var menuList = $scope.lunchMenu.split(',');
    var count = 0;
    menuList.forEach((item, i) => {
      if (item !== ""){
        count++;
      }
    });
    if (count <= 3 && count > 0){
      $scope.lunchCheckMessage = "Enjoy!";
    }else if (count > 3){
      $scope.lunchCheckMessage = "Too Much!";
    }
  };
}

})();
