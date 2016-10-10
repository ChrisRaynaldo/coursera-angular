(function() {
'use-strict';

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
		controller: NarrowItDownDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true,
	};

	return ddo;
}

function NarrowItDownDirectiveController () {
	return;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	var ctrl = this;

	ctrl.searchTerm = '';
	ctrl.found = [];
	ctrl.errorMsg = false;

	ctrl.getItems = function () {
		// console.log(ctrl.searchTerm);
		var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

		promise.then(function (response) {
			// console.log(response.length);
			if (response.length !== 0){
				ctrl.errorMsg = false;
				ctrl.found = response;
			} else {
				ctrl.errorMsg = true;
				// console.log(ctrl.errorMsg);
			}
		})
		.catch (function (error) {
			console.log("Something went terribly wrong!");
			ctrl.errorMsg = true;
		});
	};

	ctrl.removeItem = function (index) {
		ctrl.found.splice(index, 1);
	};
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function (searchTerm){
		return $http({
			method: "GET",
			url: (ApiBasePath)
		})
		.then(function (result) {
			var allItems = result.data.menu_items;
			var foundItems = [];
			// console.log(allItems);
			if (searchTerm.length !== 0) {
				for (var i = 0; i < allItems.length; i++) {
					var curDescription = allItems[i].description.toLowerCase();
					if (curDescription.indexOf(searchTerm.toLowerCase()) !== -1) {
						foundItems.push(allItems[i]);
					}
				}
			}
			return foundItems;
		});
	};
}
})();
