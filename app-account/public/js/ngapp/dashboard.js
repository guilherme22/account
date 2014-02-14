
var dashboardApp = angular.module('dashboard', []);

dashboardApp.config(function($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $httpProvider.defaults.transformRequest = function(data) {
    if(!data) return '';
    if(angular.isObject(data)) return $.param(angular.copy(data));
    return data;
  }
});

dashboardApp.factory('dashboardFactory', function($http, $window) {
  return {
    getDashboardAsync: function(callback) {
      $http.get('/dashboard/data.json').error(console.log).then(callback);
    }
  };
});
 

dashboardApp.controller('dashboardController', function($scope, $http, $window, dashboardFactory) {

    appData.start();
    $('#loading').hide();
  	$('#dashboard').fadeIn();
//  $scope.dashboard = {};
//
//  dashboardFactory.getDashboardAsync(function(results) {
//  	$scope.dashboard = results.data;
//  	$('#loading').hide();
//  	$('#dashboard').fadeIn();
//	  $.plot("#bar", [results.data.productivity], {
//	    series: {
//	      bars: {
//	        show: true,
//	        barWidth: 0.6,
//	        align: "center"
//	      }
//	    },
//	    colors: ["#94aec4", "#3473A9"],
//	    grid: {
//	      hoverable: true,
//	      clickable: true,
//	      tickColor: "#fff",
//	      borderWidth: 0
//	    },
//	    xaxis: {
//	      mode: "categories",
//	      tickLength: 0
//	    }
//	  });
//	});

});

