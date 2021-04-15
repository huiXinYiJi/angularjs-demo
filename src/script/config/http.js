'use strict';

// 重写http post 方法
angular.module('app').config(['$provide', function($provide) {
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q) {
    var get = $delegate.get;
    $delegate.post = function(url,data, config) {
      var def = $q.defer()
      get(url, {
        params: data
      }).then(function(res){
        def.resolve(res)
      }, function(err) {
        def.reject(err)
      })
      return {
        success: function(cb) {
          def.promise.then(cb)
        },
        error: function(cb) {
          def.promise.then(null, cb)
        }
      }
    }
    return $delegate
  }])
}])