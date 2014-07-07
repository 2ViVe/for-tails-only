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
  'mm.foundation.tooltip',
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
  'fto/handler',
  'fto/home',
  'fto/navigation',
  'fto/footer',
  'fto/party',
  'fto/giftCode'
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
      .otherwise({
        redirectTo: '/'
      });
  });
