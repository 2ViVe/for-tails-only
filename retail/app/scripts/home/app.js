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
          'newProducts': ['Products', function(Products) {
            return Products.getByCatalog('NP');
          }],
          'replicateOwner': ['LocalStorage', '$location',
            function(LocalStorage, $location) {
              var owner = LocalStorage.getReplicateOwner();
              if (owner) {
                $location.path('/' + owner.login);
              }
            }]
        }
      });
  }]);