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
  'fto/footer'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'views/products/products-index.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
