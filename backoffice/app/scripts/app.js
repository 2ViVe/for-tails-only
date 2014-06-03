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
  // apps
  'fto/signup',
  'fto/profile',
<<<<<<< HEAD
//  'fto/taxon',
  'fto/header'
=======
  'fto/taxon',
  'fto/header',
  'fto/gift',
  'fto/product',
  'fto/shopping'
>>>>>>> c200769c17a87809dde5e016ac10d9a6065bf4b4
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/products/', {
        templateUrl: 'views/products/products-index.html',
        //controller: 'SignUpController'
      })
      .when('/products/list', {
        templateUrl: 'views/products/products-list.html',
        //controller: 'SignUpController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/party/party-my', {
        templateUrl: 'views/party/party-my.html'
      })
      .when('/party/party-none', {
        templateUrl: 'views/party/party-none.html'
      })
      .when('/party/party-invite', {
        templateUrl: 'views/party/party-invite.html'
      })
      .when('/party/party-contact', {
        templateUrl: 'views/party/party-contact.html',
        controller: 'PartyContactController'
      })
      .when('/party/party-details', {
        templateUrl: 'views/party/party-details.html'
      })
      .when('/party/party-view-invitation', {
        templateUrl: 'views/party/party-view-invitation.html',
        controller: 'PartyInvitationController'
      })
      .when('/party/party-view-invitation-closed', {
        templateUrl: 'views/party/party-view-invitation-closed.html'
      })
      .when('/party/party-create', {
        templateUrl: 'views/party/party-create.html',
        controller: 'PartyCreateController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
