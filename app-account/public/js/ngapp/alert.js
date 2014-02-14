/*
  @module: Create/Edit Alert
*/

var alertApp = angular.module('alert', ['ngAnimate']),
    alert_r = 
    {
      logicGate: [],
      operators: [],
      priority: {},
      execWhen: [],
      item: {
        conditions: [],
        actions: [],
        manuals: []
      }
    },
    conditionModel = { booleanOperator: 'AND', event: 'Velocity', operator: '=', value: '' },
    actionModel = { command: '', action: '', when: '', value: '' },
    manualModel = { text: '' }

alertApp.config(function($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $httpProvider.defaults.transformRequest = function(data) {
    if(!data) return '';
    if(angular.isObject(data)) return $.param(angular.copy(data));
    return data;
  }
});

alertApp.factory('alertFactory', function($http, $window) {
  return {
    getAlertAsync: function(callback) {
      if($window._edit)
        callback({data: $window._edit})
      else
        $http.get('/logbots/create.json').then(callback);
    }
  };
});
 

alertApp.controller('alertController', function($scope, $http, $window, alertFactory) {
  $scope.alert_r = alert_r;
  alertFactory.getAlertAsync(function(results) {
    conditionModel = results.data.model.condition;
    actionModel = results.data.model.action;
    manualModel = results.data.model.manual;
    $scope.alert_r = results.data;
  });
  $scope.save = function($event) {
    $event.stopPropagation();
    $('#frmAlert').hide();
    $('#h1_main').html('Loading...');
    $window.scroll(0, 0);
    $http({
      method: 'POST',
      url: '/logbots/save',
      data: $scope.alert_r.item
    }).then(function(k,p,a,x) {
      $window.location = '/logbots';
    });
  }
});

alertApp.controller('conditionsController', function($scope, alertFactory) {
	$scope.add = function() {
		var condition = angular.copy(conditionModel);
		$scope.alert_r.item.conditions.push(condition);
	}
});

alertApp.controller('actionsController', function($scope, alertFactory) {
  $scope.add = function() {
    var action = angular.copy(actionModel);
    $scope.alert_r.item.actions.push(action);
  }
});

alertApp.controller('manualsController', function($scope, alertFactory) {
  $scope.add = function() {
    var manual = angular.copy(manualModel);
    $scope.alert_r.item.manuals.push(manual);
  }
});