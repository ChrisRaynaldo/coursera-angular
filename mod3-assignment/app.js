(function() {
'use-strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

function FoundItemsDirective () {
	var ddo = {
		templateUrl: 'template.html',
		scope: {
			items: '<',
			onRemove: '&',
			errorMsg: '<'
		},
		controller: NarrowItDownController,
		controllerAs: ctrl,
		bindToController: true,
	};

	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	var ctrl = this;

	ctrl.searchTerm = '';
	ctrl.found = [];
	ctrl.errorMsg = '';

	ctrl.getItems = function () {
		console.log(ctrl.searchTerm);
		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

		promise.then(function (response) {
			ctrl.found = response.data;
		})
		.catch (function (error) {
			console.log("Something went terribly wrong!");
			ctrl.errorMsg = error;
		});
	};

	ctrl.removeItem = function (index) {

	};
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function (searchTerm){
		return $http({
			method: "GET",
			url: ApiBasePath
		}).then(function (result) {
			var allItems = result.data.menu_items;
			var foundItems = [];
			console.log(allItems);
			for (var i = 0; allItems.length; i++) {
				var curDescription = allItem[i].description.toLowerCase();
				if (curDescription.indexOf(searchTerm.toLowerCase()) !== -1) {
					foundItems.push(allItem[i]);
				}
			}
			return foundItems;
		});
	};
}
})();
