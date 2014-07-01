'use strict';

angular
  .module('fto/home', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        resolve: {
          orders: ['Order', function(Order) {
            return Order.recent(0, 3);
          }],
          summary: ['BusinessSummary', function(BusinessSummary) {
            var businessSummary = new BusinessSummary();
            return businessSummary.fetch();
          }],
          user: ['User', function(User) {
            return User.fetch();
          }]
        }
      });
  }]);
