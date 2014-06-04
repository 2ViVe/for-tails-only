'use strict';

angular
  .module('fto/signup', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController',
        resolve: {
          countries: ['Registration.Countries', function(Countries) {
            return Countries.fetch();
          }]
        }
      })
      .when('/retail-signup', {
        templateUrl: 'views/sign-up/retail.html',
        controller: 'RetailSignUpController'
      });
  }]);
