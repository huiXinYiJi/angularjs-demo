'use strict';

angular.module('app').service('dict', ['$http', function($http){
  this.city = [
    {id: 1, name: '不限'},
    {id: 2, name: '少于50人'},
    {id: 3, name: '50~100人'},
    {id: 4, name: '100~500人'},
    {id: 5, name: '500人以上'}
  ]
  this.salary = []
  this.scale = []
  // $http.get('data/city.json').then(function(res){
  //   this.city = res.data
  // })
  // $http.get('data/salary.json').then(function(res){
  //   this.salary = res.data
  // })
  // $http.get('data/scale.json').then(function(res){
  //   this.scale = res.data
  // })
}])