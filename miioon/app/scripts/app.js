'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .constant('CLIENT_ID', 'ZlnElLNFjFt6pOBAOQpH8e')
  .config(['$httpProvider', 'CLIENT_ID',
    function($httpProvider, CLIENT_ID) {
      $httpProvider.defaults.headers.common = {
        'x-client-id': CLIENT_ID,
        'x-client-secret': 'HeFsCAvsXTzpHWAqRVWCibsUYlF7gjpLRUAUw551r'
      };
    }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      })
      .when('/signup', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/taxon/4', {
        templateUrl: 'views/gift/gift-card.html'
      })
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html'
      })
      .when('/host', {
        templateUrl: 'views/host.html',
        controller: 'HostController'
      })
      .when('/press', {
        templateUrl: 'views/press.html'
      })
      .when('/career', {
        templateUrl: 'views/career.html'
      })
      .when('/gift/gift-card', {
        templateUrl: 'views/gift/gift-card.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);