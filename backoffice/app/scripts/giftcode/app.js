'use strict';

angular
  .module('fto/giftCode', [
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
      .when('/gift-codes', {
        templateUrl: 'views/gift/code.html',
        controller: 'giftCodeCtrl'
      });
  }]);
