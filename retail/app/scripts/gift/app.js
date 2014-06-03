'use strict';

angular
  .module('fto/gift', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/gift', {
        templateUrl: 'views/gift/detail.html',
        controller: 'GiftController',
        resolve: {
          giftCard: ['GiftCard', function(GiftCard) {
            var giftCard = new GiftCard(5);
            return giftCard.fetch();
          }]
        }
      })
      .when('/gift/checkout', {
        templateUrl: 'views/gift/checkout.html',
        controller: 'GiftCheckoutController'
      });
  }]);
