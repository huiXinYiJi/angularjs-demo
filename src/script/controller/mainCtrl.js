'use strict';

angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope) {
  // console.log($scope.im())
  // $http.get().success().error()
  // post put delete
  // $http.post(url, {
  //  // 数据对象
  // }, {
  //   // 配置对象
  // }).then()
  // $http({
  //   url: '',
  //   method: '',
  //   params: {},
  //   data: {}
  // })
  $http.get('/data/positionList.json').then(function(resp) {
    // console.log(resp.data)
    $scope.list = resp.data
  }, function(err) {
    console.log(err)
  });
  // $scope.list = [
  //   {
  //     id: 1,
  //     name: '销售',
  //     companyName: '千度',
  //     city: '上海',
  //     industry: '互联网',
  //     time: '2021-03-31 11:30',
  //     imgSrc: 'https://via.placeholder.com/65'
  //   },
  //   {
  //     id: 2,
  //     name: '前端',
  //     companyName: '士大夫',
  //     city: '上海',
  //     industry: '互联网',
  //     time: '2021-03-31 11:30',
  //     imgSrc: 'https://via.placeholder.com/65'
  //   }
  // ]
  $scope.$watch('abc', function(val, oldVal, $scope) {
    // console.log(val, $scope.abc)
  })
}])