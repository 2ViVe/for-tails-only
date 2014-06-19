'use strict';

angular
  .module('fto/home', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        resolve: {
          'featureProducts': ['Products', function(Products) {
            return Products.getByCatalog('FP');
          }],
          'newProducts' :['Products', function(Products) {
            return Products.getByCatalog('NP');
          }]
        }
      })
      .when('/:owner', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        resolve: {
          'featureProducts': ['Products', function(Products) {
            return Products.getByCatalog('FP');
          }],
          'newProducts' :['Products', function(Products) {
            return Products.getByCatalog('NP');
          }]
        }
      });
  }]);