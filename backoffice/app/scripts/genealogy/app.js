'use strict';

angular
  .module('fto/genealogy', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/genealogy', {
        templateUrl: 'views/report/genealogy.html',
        controller: 'GenealogyController',
        resolve: {
          genealogy: ['Genealogy', function(Genealogy) {
            var genealogy = new Genealogy();
            return genealogy.fetchUniLevels()
              .then(function() {
                return genealogy.fetchPath(genealogy.data.id);
              }).then(function() {
                return genealogy;
              });
          }]
        }
      });
  }]);
