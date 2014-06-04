'use strict';

angular
  .module('fto/signin', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      });
  }]);
