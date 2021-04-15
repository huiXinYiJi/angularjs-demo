'use strict';

angular.module('app').directive('appTab', [function($scope){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/tab.html',
    scope: {
      tabClick: '&',
      list: '='
    },
    link: function($scope) {
      $scope.click = function(tab) {
        $scope.selectId = tab.id
        $scope.tabClick({id: tab.id, name: tab.name})
      }
    }
  }
}])