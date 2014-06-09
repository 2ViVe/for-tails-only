'use strict';

angular
  .module('fto/tools', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/tools', {
        templateUrl: 'views/tools/train.html',
        controller: 'TrainController',
        resolve: {
          tools: ['Tools', function(Tools) {
            return Tools.fetch();
          }]
        }
      });
  }]);