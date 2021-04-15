'use strict';

angular.module('app').directive('appSheet', [function($scope){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/sheet.html',
    scope: {
      list: '=',
      visible: '=',
      select: '&'
    },
    link: function($scope) {
    }
  }
}])