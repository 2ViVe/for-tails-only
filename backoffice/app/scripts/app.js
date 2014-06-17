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
  'fto/profile',
  'fto/taxon',
  'fto/header',
  'fto/gift',
  'fto/product',
  'fto/shopping',
  'fto/report',
  'fto/checkout',
  'fto/home',
  'fto/party',
  'fto/giftCode',
  'fto/tools',
  'fto/footer'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'views/products/products-index.html'
      })
      .when('/party/party-none', {
        templateUrl: 'views/party/party-none.html'
      })
      .when('/party/party-contact', {
        templateUrl: 'views/party/party-contact.html',
        controller: 'PartyContactController'
      })
      .when('/party/party-details', {
        templateUrl: 'views/party/party-details.html',
        controller: 'PartyDetailsController'
      })
      .when('/organization', {
        templateUrl: 'views/organization.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
