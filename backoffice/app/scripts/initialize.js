'use strict';

angular.module('fto')
  .constant('DEFAULT_COUNTRY_ID', 1214)
  .run(['$rootScope', 'cfpLoadingBar', '$location',
    function($rootScope, cfpLoadingBar, $location) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
      });

      $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);