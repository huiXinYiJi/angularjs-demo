'use strict';

angular.module('app', ['ui.router', 'ngCookies', 'validation', 'ngAnimate']).run(['$rootScope', function($rootScope){
  // run 初始化执行
  $rootScope.im = function() {
    console.log('im')
  }
}])