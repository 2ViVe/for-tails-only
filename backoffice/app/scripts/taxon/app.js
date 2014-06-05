'use strict';

angular
  .module('fto/taxon', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/products/renewal-items', {
        templateUrl: 'views/product/renewal-items.html',
        controller: 'RenewalController',
        resolve: {
          products: ['Products', function(Products) {
            return Products.getByTaxon(2, 'RW');
          }]
        }
      })
      .when('/products/:taxonPermalink/:subTaxonPermalink?', {
        templateUrl: 'views/product/taxon.html',
        controller: 'TaxonController',
        resolve: {
          taxons: ['Taxons', function(Taxons) {
            return Taxons.fetch();
          }]
        }
      });
  }]);