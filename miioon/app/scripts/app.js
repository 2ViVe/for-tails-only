'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils',
    'ngQuickDate'
  ])
  .constant('CLIENT_ID', 'test_client_id_1')
  .config(['$httpProvider', 'CLIENT_ID', function($httpProvider, CLIENT_ID) {
    $httpProvider.defaults.headers.common = {
      'x-client-id': CLIENT_ID,
      'x-client-secret': 'test_client_secret_1'
    };
//    TODO: Uncomment this when cross-domain is enabled.
//    $httpProvider.interceptors.push(function($q) {
//      return {
//        'request': function(config) {
//          if (config.url.indexOf('/api/') === 0) {
//            config.url = 'http://199.27.105.132:10442' + config.url.replace('/api', '');
//          }
//          return config || $q.when(config);
//        }
//      };
//    });
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
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);