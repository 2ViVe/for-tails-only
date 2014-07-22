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
  'fto/giftCode',
  'fto/autoship'
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
      .when('/:owner', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        resolve: {
          'replicateOwner': ['$http', '$route',
            function($http, $route) {
              console.log($route.current);
              var newOwner = $route.current.params.owner;
              return $http.get('/' + newOwner);
            }],
          'featureProducts': ['Products', function(Products) {
            return Products.getByCatalog('FP');
          }],
          'newProducts': ['Products', function(Products) {
            return Products.getByCatalog('NP');
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
