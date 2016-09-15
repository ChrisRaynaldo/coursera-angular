(function() {
'use-strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.menuList = "";
  $scope.menuListToArray = function() {
    var array = $scope.menuList.split(',');
    return array;
  };

  $scope.CheckForLunch = function () {
    $scope.emptyMenuList = 0;
    $scope.menuListLength = 0;
    $scope.message = "";
    $scope.customStyle = {};

    var menuListArray = $scope.menuListToArray();
    for (var i = 0; i < menuListArray.length; i++) {
      if (menuListArray[i] == "") {
        $scope.emptyMenuList++;
      } else {
        $scope.menuListLength++;
      }
    }

    if ($scope.menuListLength == 0) {
      $scope.message = "Please enter data first";
      $scope.customStyle.style = {"color" : "red"};
      $scope.customStyle.boxStyle = {"border-color" : "red"};
    } else if ($scope.menuListLength <= 3) {
      $scope.message = "Enjoy!";
      $scope.customStyle.style = {"color" : "green"};
      $scope.customStyle.boxStyle = {"border-color" : "green"};
    } else {
      $scope.message = "Too much!";
      $scope.customStyle.style = {"color" : "green"};
      $scope.customStyle.boxStyle = {"border-color" : "green"};
    }


  };
}

})();
