/*
  @module: default layout / menu
  @thisISROAD, Js, Raj, Kpax
*/

var menuApp = angular.module('menu', []);

menuApp.config(function($httpProvider) {
//  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//  $httpProvider.defaults.transformRequest = function(data) {
//    if(!data) return '';
//    if(angular.isObject(data)) return $.param(angular.copy(data));
//    return data;
//  }
});

menuApp.factory('menuFactory', function($http) {
  return {
    getMessagesAsync: function(callback) {
      $http.get('/json/messages.json').then(callback);
    }
  };
});

menuApp.controller('menuController', function($scope, $http, $window, menuFactory) {

//  $scope.socket = io.connect('http://' + $window.location.host.split(':')[0]);
//  $scope.socket.emit('rt-login', JSON.stringify({ user: $('#nvm').data('user') }))

//  $scope.socket.on('rt-messages', function (msg) {
//    var i = 0, jmsg = $.parseJSON(msg); console.log('jmsg', jmsg)
//    for(;i < jmsg.length; i++)
//      $scope.prependMsg(jmsg[i]);
//  });
//
//  $scope.messages = [];
//  $scope.insertMsg = function(message) {
//    $scope.messages.push(message);
//    $scope.$apply();
//  }
//  $scope.prependMsg = function(message) {
//    $scope.messages.unshift(message);
//    $scope.$apply();
//  }
//  $('#menuMsgs').show();
//  $scope.refresh = function() {
//    menuFactory.getMessagesAsync(function(results) {
//      $scope.messages = results.data;
//      $('#menuMsgs').show();
//    });
//  }
//  $scope.refresh();
});


window.setTimeout(function() {
  $('.vibrate').removeClass('vibrate');
},10000);