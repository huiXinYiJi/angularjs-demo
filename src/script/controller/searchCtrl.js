'use strict';

angular.module('app').controller('searchCtrl', ['limitToFilter', 'dict', '$http', '$scope', function(limitToFilter, dict, $http, $scope) {

  // js引用limitTo过滤器
  console.log(limitToFilter([1,2,3,4], 3))

  $scope.name = '';

  $scope.search = function() {
    $http.get('/data/positionList.json', {
      params: {
        name: $scope.name
      }
    }).then(function(resp) {
      $scope.positionList = resp.data
    }, function(err) {
      console.log(err)
    });
  }

  $scope.search();
  $scope.sheet = {}
  $scope.tabList = [
    {id: 'city', name: '城市'},
    {id: 'salary', name: '薪水'},
    {id: 'scale', name: '公司规模'}
  ]
  var tabId = ''
  $scope.filterObj = {}

  $scope.tClick = function(id, name) {
    tabId = id
    $scope.sheet.list = dict[id]
    $scope.sheet.visible = true
  }

  $scope.sClick = function(id, name) {
    console.log(id, name)
    if (id !== 1) {
      angular.forEach($scope.tabList, function(item) {
        if (item.id === tabId) {
          item.name = name
        }
      })
      $scope.filterObj['id'] = id
    } else { // 不限制
      delete $scope.filterObj['id']
      angular.forEach($scope.tabList, function(item) {
        if (item.id === tabId) {
          item.name = '城市'
        }
      })
    }
  }
}])