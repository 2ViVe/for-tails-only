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
      .when('/find-handler', {
        templateUrl: 'views/handler/locate.html',
        controller: 'handlerController'
      })
  }]);