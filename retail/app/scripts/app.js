'use strict';

angular.module('fto', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  '2ViVe',
  'ui.utils',
  'mm.foundation.modal',
  'mm.foundation.accordion',
  'chieffancypants.loadingBar',
  'angulartics',
  'angulartics.google.analytics',

  'fto/signup',
  'fto/signin',
  'fto/header',
  'fto/profile',
  'fto/gift',
  'fto/product',
  'fto/report',
  'fto/taxon',
  'fto/report',
  'fto/shopping',
  'fto/checkout',
  'fto/home',
  'fto/navigation',
  'fto/footer',
  'fto/party'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'views/products/products-index.html'
      })
      .when('/handler-connect', {
        templateUrl: 'views/handler/connect.html'
      })
      .when('/handler-connect-success', {
        templateUrl: 'views/handler/connect-success.html'
      })
      .when('/handler-locate', {
        templateUrl: 'views/handler/locate.html'
      })
      .when('/handler-locate-result', {
        templateUrl: 'views/handler/locate-result.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
