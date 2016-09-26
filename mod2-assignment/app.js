(function() {
'use-strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.toBuyArray = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
  var alreadyBoughtList = this;
  alreadyBoughtList.alreadyBoughtArray = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService () {
  var service = this;
  // Starting array for items to buy
  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "cookies", quantity: 20 },
    { name: "cookies", quantity: 30 },
    { name: "cookies", quantity: 40 },
    { name: "cookies", quantity: 50 }
  ];

  // Empty array for items already bought
  var alreadyBoughtItems = [];

  service.buyItem = function (index) {
    var itemBought = toBuyItems[index];
    toBuyItems.splice(index, 1);
    alreadyBoughtItems.push(itemBought);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };
}

})();
