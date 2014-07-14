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

              var replicateOwner = LocalStorage.getReplicateOwner();
              var userId = replicateOwner ? replicateOwner['user-id'] : undefined;
              Events.fetchByUserId(userId).then(function(events) {
                if (!events || events.length === 0) {
                  defer.reject({
                    goTo: '/checkout'
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
