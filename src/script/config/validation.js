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