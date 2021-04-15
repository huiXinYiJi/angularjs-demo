npm i -g bower

bower i angular --save

bower init

bower install angular-ui-router --save


bower install

npm install


### angularjs

#### controller  
不要在controller中用原生方式操作dom元素  
视图对应的业务逻辑，为数据模型添加行为和属性  
常用属性：$id, $parent, $root  
常用函数：$watch, $on, $brodacast, $emit, $digest  

$watch : 监控scope属性 

自定义事件数据传递   
$brodacast ： 向下广播  
$emit： 向上广播  
$on: 接收事件  

$digest  双向数据绑定失效时或原生操作dom后数据未更新使用， 只触发当前作用域和它的子作用域上的监控  
$scope.$apply()  按需要强制渲染前端页面， 会触发作用域树上的所有监控  

#### 服务  
单例，懒加载，公用函数  
常用服务  
$http  
$q  类promise 异步  
$timeout  
$interval  $interval(function(){}, 2000) $interval.camcel(timer)  
$rootScope  app.js中使用run初始化执行一些操作

自定义服务 
cache 

#### 过滤器 filter  

内置过滤器：
currency  {{1.234 | currency:"$":1}}   ==> $1.2

number  {{1.234 | number:1}}   ==> $1.2

date  {{1618383948083 | date:'yyyy-mm-dd HH:mm:ss'}}   ==> 2021-4-14 15:06:34

lowercase/uppercase

limitTo  {{[1,2,3,4] | limitTo:3}} ==> [1,2,3]  
截取字符串数字数组前n位数据

orderBy  排序  ng-repeat="item in array | orderBy: '-id'"  =>对象数组中按照id降序排列，-去掉为升序排列

过滤方法叠加  ng-repeat="item in array | orderBy: '-id' | limitTo:3"


自定义过滤器 filterMethod
```js
angular.module('app').filter('filterMethod', [function(){
  return function(orignData, filterObj) {
    return result
  }
}])
``` 
调用 
```html  
ng-repeat="item in data|filterMethod:filterObj"
```

### 动画
animate.css

angular-animate

ng-enter

ng-leave
