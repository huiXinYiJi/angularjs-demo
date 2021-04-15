'use strict';

angular.module('app').directive('appHeadBar', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/headBar.html',
    scope: {
      text: '@'
    },
    link: function($scope, element, attr) {
      $scope.back = function() {
        window.history.back()
      }
      // 接收事件
      $scope.$on('selfFunc', function(event, data) {
        // console.log('从positonCtrl接收的事件', event, data)
      })

      // 向上发送事件
      $scope.$emit('upSelfFunc', {name: 12})

      // $digest 数据绑定失效时可使用此方法强制更新
      // $scope.$digest();

    }
  }
}])