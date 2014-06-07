'use strict';

angular
  .module('fto/profile', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/account', {
        templateUrl: 'views/profile/index.html',
        resolve: {
          'countries': ['Registration.Countries', function(Countries) {
            return Countries.fetch();
          }]
        }
      });
  }]);
