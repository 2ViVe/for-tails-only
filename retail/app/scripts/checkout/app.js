'use strict';

angular
  .module('fto/checkout', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie',
    'mm.foundation.modal'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'views/checkout/checkout.html',
        controller: 'CheckoutController',
        resolve: {
          order: ['Shopping', 'Order', '$location',
            function(Shopping, Order, $location) {
              return Shopping.fetch().then(function(shopping) {
                return Order.checkout(shopping)
                  .catch(function() {
                    $location.path('/signin');
                  });
              });
            }]
        }
      });
  }]);
