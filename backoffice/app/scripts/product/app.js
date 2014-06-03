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
        templateUrl: 'views/product/products-detail.html',
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
      });
  }]);
