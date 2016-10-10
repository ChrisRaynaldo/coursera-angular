(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/templates/item-detail.template.html',
  bindings: {
    items: '<'
  }
});

})();
