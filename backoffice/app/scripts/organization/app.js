'use strict';

angular
  .module('fto/organization', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/organization', {
        templateUrl: 'views/organization.html',
        controller: 'OrganizationController',
        resolve: {
          unilevel: ['Organization', function(Organization) {
            return Organization.fetch();
          }]
        }
      });
  }]);