'use strict';

angular
  .module('fto/shopping', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/shopping-options', {
        templateUrl: 'views/shopping/options.html',
        controller: 'ShoppingOptionsController',
        resolve: {
          events: ['Events', 'LocalStorage', '$q',
            function(Events, LocalStorage, $q) {
              var defer = $q.defer();

              Events.fetchAll(true).then(function(events) {
                if (!events || events.length === 0) {
                  defer.reject({
                    goTo: '/products/cats/cat-treats'
                  });
                }
                defer.resolve(events);
              });

              return defer.promise;
            }]
        }
      })
      .when('/shopping', {
        templateUrl: 'views/shopping/shopping.html',
        controller: 'ShoppingController',
        resolve: {
          shopping: ['Shopping', function(Shopping) {
            return Shopping.fetch();
          }]
        }
      });
  }]);
