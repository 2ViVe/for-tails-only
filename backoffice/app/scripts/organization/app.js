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
        templateUrl: 'views/organization/organization.html',
        controller: 'OrganizationController',
        resolve: {
          date : ['Organization', function(Organization){
            return Organization.getDate();
          }]
        }
      });
  }]);