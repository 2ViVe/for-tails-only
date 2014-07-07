'use strict';

angular
  .module('fto/product', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/product/:productId/:catalogCode?', {
        templateUrl: 'views/product/detail.html',
        controller: 'ProductDetailCtr',
        resolve: {
          'product': ['Product', '$route',
            function(Product, $route) {
              var product = new Product($route.current.params.productId, $route.current.params.catalogCode);
              return product.fetch();
            }],
          'taxons': ['Taxons', function(Taxons) {
            return Taxons.fetch();
          }]
        }
      })
      .when('/search/:query', {
        controller: 'SearchController',
        templateUrl: 'views/product/search.html',
        resolve: {
          'data': ['Products', '$route',
            function(Products, $route) {
              return Products.fetch({
                q: $route.current.params.query
              });
            }]
        }
      });
  }]);
