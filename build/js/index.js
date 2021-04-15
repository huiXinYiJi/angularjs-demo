'use strict';

angular.module('app', ['ui.router', 'ngCookies', 'validation', 'ngAnimate']).run(['$rootScope', function($rootScope){
  // run 初始化执行
  $rootScope.im = function() {
    console.log('im')
  }
}])
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
'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  })
  .state('position', {
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'view/search.html',
    controller: 'searchCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'view/login.html',
    controller: 'loginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'view/register.html',
    controller: 'registerCtrl'
  })
  .state('me', {
    url: '/me',
    templateUrl: 'view/me.html',
    controller: 'meCtrl'
  })
  .state('post', {
    url: '/post',
    templateUrl: 'view/post.html',
    controller: 'postCtrl'
  })
  .state('favorite', {
    url: '/favorite',
    templateUrl: 'view/favorite.html',
    controller: 'favoriteCtrl'
  })
  ;$urlRouterProvider.otherwise('main')
}])
'use sctict';

angular.module('app').config(['$validationProvider', function($validationProvider) {
  // 规则
  var expression = {
    phone: /^1[\d]{10}/,
    password: function(value) {
      return value && value.length > 5
    },
    required: function(value) {
      return !!value
    }
  }
  // 提示语
  var defaultMsg = {
    phone: {
      success: '',
      error: '必须是11位手机号'
    },
    password: {
      success: '',
      error: '长度至少6位'
    },
    required: {
      success: '',
      error: '不能为空'
    }
  }
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg)
}])
'use strict';
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){

}])
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
'use strict';
angular.module('app').controller('meCtrl', ['$http', '$scope', function($http, $scope){

}])
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
'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){

}])
'use strict';
angular.module('app').controller('registerCtrl', ['$http', '$scope', function($http, $scope){

}])
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
'use strict';

angular.module('app').directive('appCompany', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/company.html',
    scope: {
      data: '='
    }
  }
}])
'use strict';

angular.module('app').directive('appFoot', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}])
'use strict';

angular.module('app').directive('appHead', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html'
  }
}])
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
'use strict';

angular.module('app').directive('appPositionInfo', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html',
    scope: {
      isActive: '=',
      isLogin: '=',
      infoData: '='
    },
    link: function($scope) {
      // $scope.imagePath = $scope.isActive ? 'image/star-active.png' : 'image/star.png'
    }
  }
}])
'use strict';

angular.module('app').directive('appPositionList', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionList.html',
    scope: {
      data: '=',
      filterObj: '='
    }
  }
}])
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
'use strict';

angular.module('app').directive('appTab', [function($scope){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/tab.html',
    scope: {
      tabClick: '&',
      list: '='
    },
    link: function($scope) {
      $scope.click = function(tab) {
        $scope.selectId = tab.id
        $scope.tabClick({id: tab.id, name: tab.name})
      }
    }
  }
}])
'use strict';

angular.module('app').filter('filterByObj', [function() {
  return function(list, obj) {
    var result = []
    angular.forEach(list, function(item) {
      var isEqual = true
      for(var e in obj) {
        if (item[e] !== obj[e]) {
          isEqual = false
        }
      }
      if (isEqual) {
        result.push(item)
      }
    })
    return result
  }
}])
'use strict';

angular.module('app')
// .service('cache', ['$cookies', function($cookies){
//   this.put = function(key, value) {
//     $cookies.put(key, value)
//   }
//   this.get = function(key) {
//     return $cookies.get(key)
//   }
//   this.remove = function(key) {
//     $cookies.remove(key)
//   }
  .factory('cache', ['$cookies', function($cookies){
    var obj = {}
    return {
      put: function(key, value) {
        $cookies.put(key, value)
      },
      get: function(key) {
        return $cookies.get(key)
      },
      remove: function(key) {
        $cookies.remove(key)
      }
    }
}])
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