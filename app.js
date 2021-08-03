(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'narrowItDownList.html',
    scope: {
      items: '<',
      onRemove: '&',
      title: '@title'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  // get foundItems
  list.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    promise.then(function(items){
      if (items && items.length > 0) {
        list.found = items;
        list.title = "Found Items";
      } else {
        list.found = [];
        list.title = "Nothing Found!";
      }

    });
  };

  list.removeItem = function(itemIndex) {
    list.found.splice(itemIndex, 1);
  }
}


// If not specified, maxItems assumed unlimited
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http(
      {
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }
    ).then(function (response) {
      var foundItems = [];
      searchTerm = searchTerm || "";
      searchTerm = searchTerm.trim();
      if (searchTerm === "") {
        return foundItems;
      }
      // process result and only keep items that match
      searchTerm = searchTerm.toLowerCase();
      var counter = 0;
      for (var i = 0; i < response.data.menu_items.length; i++){
        var item = response.data.menu_items[i];
        if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(item);
        }
      }
      return foundItems;
    })
  };
}

})();
