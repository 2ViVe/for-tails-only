'use strict';

angular
  .module('fto/autoship', [
    'ngRoute',
    '2ViVe'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
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
