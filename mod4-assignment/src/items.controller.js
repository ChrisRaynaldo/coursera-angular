(function () {
'use-strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController ($stateParams, items) {
  var categoryDetail = this;

  categoryDetail.menuItems = items.data.menu_items;
  categoryDetail.name = items.data.category.name;
}

})();
