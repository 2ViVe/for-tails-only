'use strict';

angular.module('fto')
  .constant({
    'DEFAULT_COUNTRY_ID': 1214,
    'PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE': 11442,
    'PORT_FOR_SECURE_RETAIL_DEMO_SITE': 22442,
    'PORT_FOR_BACK_OFFICE_DEMO_SITE': 22442,
    'URL_FOR_RETAIL_PRODUCTION_SITE': 'http://www.fortailsonly.com',
    'URL_FOR_BACK_OFFICE_PRODUCTION_SITE': 'https://backoffice.fortailsonly.com',
    'URL_FOR_RETAIL_DEMO_SITE': 'www',
    'URL_FOR_BACK_OFFICE_DEMO_SITE': 'backoffice',
    'DEFAULT_ROLE_CODE': 'R',
    'CURRENCY_SYMBOL': '$',
    'COMPANY_CODE': 'FTO'
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('BackOfficeInterceptor');
  }])
  .run(['User', 'UrlHandler', 'Shopping', '$location',
    function(User, UrlHandler, Shopping, $location) {
      User.fetch().then(function() {
        if (User.data.roleCode === 'R') {
          UrlHandler.goToRetailSite();
          return null;
        }

        if (User.shouldRenew) {
          Shopping.empty();
          if (['/checkout', '/shopping', '/products/system'].indexOf($location.path()) < 0) {
            $location.path('/products/renewal-items');
          }
        }

        Shopping.fetch();
      }).catch(function() {
        UrlHandler.goToRetailSite('/signin');
      });
    }])
  .run(['$rootScope', 'cfpLoadingBar', '$location', 'User',
    function($rootScope, cfpLoadingBar, $location, User) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
        if (User.shouldRenew &&
          ['/checkout', '/shopping', '/products/system'].indexOf($location.path()) < 0) {
          $location.path('/products/renewal-items');
        }
      });

      $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);