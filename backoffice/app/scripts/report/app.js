'use strict';

angular
  .module('fto/report', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/report/order', {
        templateUrl: 'views/report/order.html',
        controller: 'OrderReportController',
        resolve: {
          orders: ['Order', function(Order) {
            return Order.recent(0, 25);
          }]
        }
      });
  }]);
