'use strict';
angular.module('app').controller('loginCtrl', ['$state', '$http', '$scope', function($state, $http, $scope){
  $scope.user = {}
  $scope.submit = function () {
    $http.post('data/positionList.json', $scope.user).success(function(res) {
      // console.log(res.data)
      $state.go('me') // 路径跳转
    })
  }
}])