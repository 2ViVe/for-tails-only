'use strict';

angular
  .module('fto/commission', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/commission/report', {
        templateUrl: 'views/commission/report.html',
        controller: 'CommissionReportController',
        resolve: {
          commission : ['Commission', function(Commission){
            return new Commission().fetchType();
          }]
        }
      });
  }]);