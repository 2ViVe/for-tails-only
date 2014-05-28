'use strict';

angular.module('fto')
  .constant({
    'DEFAULT_COUNTRY_ID': 1214,
    'PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE': 11442,
    'PORT_FOR_SECURE_RETAIL_DEMO_SITE': 22442,
    'PORT_FOR_BACK_OFFICE_DEMO_SITE': 22442,
    'URL_FOR_RETAIL_PRODUCTION_SITE': 'http://www.fortailsonly.com',
    'URL_FOR_BACK_OFFICE_PRODUCTION_SITE': 'https://backoffice.fortailsonly.com',
    'URL_FOR_RETAIL_DEMO_SITE': 'fto.www',
    'URL_FOR_BACK_OFFICE_DEMO_SITE': 'fto.backoffice',
    'DEFAULT_ROLE_CODE': 'R'
  })
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