'use strict';

angular
  .module('fto/party', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/party/create', {
        templateUrl: 'views/party/create.html',
        controller: 'PartyCreateController',
        resolve: {
          type: ['Party', function(Party) {
            return Party.fetchTypes().then(function(types) {
              return types[0];
            });
          }],
          country: ['Countries', 'Address', function(Countries, Address) {
            return Countries.fetch().then(function(countries) {
              var homeAddress = Address.create('home');
              return homeAddress.fetch().then(function(address) {
                var homeCountry = null;
                angular.forEach(countries, function(country) {
                  if (country.id === address.countryId) {
                    homeCountry = country;
                  }
                });
                return homeCountry;
              });
            });
          }]
        }
      });
  }]);