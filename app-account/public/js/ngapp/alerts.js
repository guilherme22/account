/*
  @module: List/Manage alerts
*/

var alertsApp = angular.module('alerts', []);

alertsApp.config(function($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $httpProvider.defaults.transformRequest = function(data) {
    if(!data) return '';
    if(angular.isObject(data)) return $.param(angular.copy(data));
    return data;
  }
});

alertsApp.factory('alertsFactory', function($http, $window) {
  return {
    getAlertsAsync: function(callback) {
      $http.get('/logbots/list.json').error(console.log).then(callback);
    }
  };
});
 

alertsApp.controller('alertsController', function($scope, $http, $window, alertsFactory) {
  $scope.alerts = [];
  var idx = $('#alerts_idx');
  alertsFactory.getAlertsAsync(function(results) {
    $scope.alerts = results.data;
    $('#a_loading').hide();
    idx.fadeIn();
  });

  idx.on('click', 'a[data-id]', function(ev) {
    ev.preventDefault();
    window.location = '/logbots/' + $(this).data('id');
  });

  idx.on('click', '.alert .title', function(ev) {
    ev.preventDefault();
    var s = $(this), p = s.parents('.alert'), d = p.find('.detail'), x = d.is(':visible');
    var ic = p.find('i.c');
    ic.attr('class', !ic.hasClass('icon-chevron-right') ? 'c icon-chevron-right': 'c icon-chevron-down');
    d.stop(true,true);
    d[x? 'slideUp': 'slideDown']();
  });

  idx.find('.alert .title').css('cursor', 'pointer');
  
  $scope.refresh = function($event) {}
});

