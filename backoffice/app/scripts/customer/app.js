'use strict';

angular
  .module('2ViVe/report', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/report/customer/order', {
        templateUrl: 'views/customer/order.html',
        controller: 'CustomerOrderController',
        resolve: {
          customers: ['Customers', function(Customers) {
            var customers = new Customers();
            return customers.fetchOrders();
          }]
        }
      });
  }]);
