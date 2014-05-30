'use strict';

angular.module('fto', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  '2ViVe',
  'ui.utils',
  'chieffancypants.loadingBar',

  'fto/signup',
  'fto/signin'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      })
      .when('/retail-signup', {
        templateUrl: 'views/sign-up/retail-signup.html'
      })
      .when('/quick-signup', {
        templateUrl: 'views/sign-up/quick-signup.html'
      })
      .when('/products/', {
        templateUrl: 'views/products/products-index.html',
        //controller: 'SignUpController'
      })
      .when('/products/list', {
        templateUrl: 'views/products/products-list.html',
        //controller: 'SignUpController'
      })
      .when('/products/cart', {
        templateUrl: 'views/products/products-cart.html',
        //controller: 'SignUpController'
      })
      .when('/products/detail', {
        templateUrl: 'views/products/products-detail.html',
        //controller: 'SignUpController'
      })
      .when('/products/gift-detail', {
        templateUrl: 'views/products/products-gift-detail.html',
        //controller: 'SignUpController'
      })
      .when('/products/success', {
        templateUrl: 'views/products/products-success.html',
        //controller: 'SignUpController'
      })
      .when('/products/checkout', {
        templateUrl: 'views/products/products-checkout.html',
        //controller: 'SignUpController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
