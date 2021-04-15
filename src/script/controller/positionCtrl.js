'use strict';

angular.module('app').controller('positionCtrl', ['$q', '$http', '$state', '$scope', '$timeout', '$interval', 'cache', function($q, $http, $state, $scope, $timeout, $interval, cache) {
  // cache.put('to', '123');
  // cache.remove('to');
  // 路径携带参数 $state.params获取
  // console.log($scope, $state, $state.params.id)
  $scope.isLogin = false
  // $scope.list = []

  // $q promise使用
  function getPositon() {
    var defer = $q.defer();
    $http.get('/data/positionList.json',{
      params: {
        id: $state.params.id
      }
    }).then(function(resp) {
      // $scope.list = resp.data

      // 向下广播事件
      $scope.$broadcast('selfFunc', {index: 1})

      defer.resolve(resp.data)
    }, function(err) {
      // console.log(err)
      return defer.reject(err)
    });
    return defer.promise;
  }

  function getCompany(id) {
    // $http获取company数据
  }

  getPositon().then(function(data){
    // console.log('ok', data)
    // getCompany(data.id)
  }, function(err) {
    console.log('err', err)
  })

  // $q.all([fun1(), fun2()]).then()

  $scope.$on('upSelfFunc', function(event, data) {
    // console.log('从headbar接收的事件', event, data)
  })

  // 执行队列
  $timeout(function(){}, 3000);

  $interval(function(){}, 2000);



}])