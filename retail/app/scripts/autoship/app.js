'use strict';

angular
  .module('fto/autoship', [
    'ngRoute',
    '2ViVe'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/autoship/create', {
        templateUrl: 'views/auto-ship/create.html',
        controller: 'AutoShipCreateController',
        resolve: {
          address: ['Address', function(Address) {
            return Address.fetch();
          }],
          autoShips: ['AutoShips', 'User', '$q',
            function(AutoShips, User, $q) {
              var deferred = $q.defer();
              User.fetch()
                .then(function() {
                  var autoShips = new AutoShips();
                  return autoShips.fetchProducts();
                })
                .then(function(autoShips) {
                  deferred.resolve(autoShips);
                })
                .catch(function() {
                  deferred.reject({
                    goTo: '/signin'
                  });
                });

              return deferred.promise;
            }]
        }
      })
      .when('/autoship', {
        templateUrl: 'views/auto-ship/list.html',
        controller: 'AutoShipsController',
        resolve: {
          autoShips: ['AutoShips', 'User', '$q',
            function(AutoShips, User, $q) {
              var deferred = $q.defer();
              User.fetch()
                .then(function() {
                  var autoShips = new AutoShips();
                  return autoShips.fetch();
                })
                .then(function(autoShips) {
                  deferred.resolve(autoShips);
                })
                .catch(function() {
                  deferred.reject({
                    goTo: '/signin'
                  });
                });

              return deferred.promise;
            }]
        }
      });
  }]);
