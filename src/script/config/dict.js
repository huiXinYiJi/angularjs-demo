// 'use strict';

// // 创建全局变量 dict  value无法赋值
// angular.module('app').value('dict', {}).run(['dict', '$http', function($http, dict){
//   dict = {
//     city: [
//       {id: 1, name: '不限'},
//       {id: 2, name: '少于50人'},
//       {id: 3, name: '50~100人'},
//       {id: 4, name: '100~500人'},
//       {id: 5, name: '500人以上'}
//     ],
//     salary: [],
//     scale: []
//   }
//   console.log(1, dict)
//   // $http.get('data/city.json').then(function(res){
//       // dict.city = res.data
//   // })
//   // $http.get('data/salary.json').then(function(res){
//       // dict.salary = res.data
//   // })
//   // $http.get('data/scale.json').then(function(res){
//       // dict.scale = res.data
//   // })
// }])