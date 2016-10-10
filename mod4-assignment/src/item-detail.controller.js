(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var catDetail = this;
  console.log(items);
  catDetail.menuItems = items.data.menu_items;
  catDetail.name = items.data.category.name;
  };


})();
