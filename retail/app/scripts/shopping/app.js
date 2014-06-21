'use strict';

angular
  .module('fto/shopping', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/shopping-options', {
        templateUrl: 'views/shopping/options.html',
        controller: 'ShoppingOptionsController',
        resolve: {
          events: ['Events', 'LocalStorage', function(Events, LocalStorage) {
            return Events.fetchByUserId(LocalStorage.getReplicateOwner()['user-id']);
          }]
        }
      })
      .when('/shopping', {
        templateUrl: 'views/shopping/shopping.html',
        controller: 'ShoppingController',
        resolve: {
          shopping: ['Shopping', function(Shopping) {
            return Shopping.fetch();
          }]
        }
      });
  }]);
