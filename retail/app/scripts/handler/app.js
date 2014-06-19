'use strict';

angular
  .module('fto/handler', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/handler-locate', {
        templateUrl: 'views/handler/locate.html',
        controller: 'handlerController'
      })
      .when('/handler-locate-result', {
        templateUrl: 'views/handler/locate-result.html',
        controller: 'handlerResultController',
        resolve: {
          'handlers': ['Handlers', '$location', function(Handlers,$location) {
            var params = $location.search();
            return Handlers.fetch(params.microchipId, params.firstName, params.lastName);
          }]
        }
      });
  }]);