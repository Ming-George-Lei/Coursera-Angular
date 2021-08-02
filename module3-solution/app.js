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
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
  /*
  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };*/
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  // Use factory to create new shopping list service
  /*
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  };

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
  */
  // get foundItems
  list.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    promise.then(function(items){
      if (items && items.length > 0) {
        list.found = items;
      } else {
        list.found = [];
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

  // List of shopping items
  //var foundItems = [];

  /*
  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };*/
  service.getMatchedMenuItems = function(searchTerm) {



    return $http(
      {
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }
    ).then(function (response) {
      //console.log(response.data);
      var foundItems = []
      // process result and only keep items that match
      searchTerm = searchTerm.toLowerCase();
      var counter = 0;
      for (var i = 0; i < response.data.menu_items.length; i++){
        var item = response.data.menu_items[i];
        //console.log(item);
        if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(item);
        }
      }
      //console.log(foundItems);
      // return processed items
      return foundItems;
    })
  };
/*
  service.removeItem = function (itemIndex) {
    service.found.splice(itemIndex, 1);
  };*/

}

})();
