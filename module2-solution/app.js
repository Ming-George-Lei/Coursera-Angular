(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyItem = this;

  //itemAdder.itemName = "";
  //itemAdder.itemQuantity = "";
  toBuyItem.items = ShoppingListCheckOffService.getToByItems();
  //itemAdder.addItem = function () {
    //ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  //}
  toBuyItem.moveToBuyItemToBoughtItem = function(itemIndex) {
    ShoppingListCheckOffService.moveToBuyItemToBoughtItem(itemIndex);
  };

  toBuyItem.isItemEmpty = function() {
    return ShoppingListCheckOffService.isToBuyItemEmpty();
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtItem = this;

  boughtItem.items = ShoppingListCheckOffService.getBoughtItems();

  boughtItem.isItemEmpty = function() {
    return ShoppingListCheckOffService.isBoughtItemEmpty();
  }
  //showList.removeItem = function (itemIndex) {
  //  ShoppingListService.removeItem(itemIndex);
  //};
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var toBuyItems = [
    {
      name : 'cookies',
      quantity : 10
    },
    {
      name : 'bananas',
      quantity : 12
    },
    {
      name : 'flour',
      quantity : 20
    },
    {
      name : 'chocolate',
      quantity : 5
    },
    {
      name : 'candies',
      quantity : 25
    }
  ];
  // List of bought items
  var boughtItems = [];

  service.moveToBuyItemToBoughtItem = function(itemIndex) {
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToByItems = function() {
    return toBuyItems;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  };

  service.isToBuyItemEmpty = function() {
    return toBuyItems.length === 0;
  }

  service.isBoughtItemEmpty = function() {
    return boughtItems.length === 0;
  }
/*
  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };*/
}

})();
