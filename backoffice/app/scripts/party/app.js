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
      .when('/party', {
        templateUrl: 'views/party/party-my.html',
        controller: 'PartyLandingController',
        resolve: {
          events: ['Events', function(Events) {
            return Events.fetchAll();
          }]
        }
      })
      .when('/party/:partyId/invite', {
        templateUrl: 'views/party/invite.html',
        controller: 'PartyInviteController',
        resolve: {
          event: ['Event', '$route', function(Event, $route) {
            var event = new Event($route.current.params.partyId);
            return event.fetch();
          }]
        }
      })
      .when('/party/create', {
        templateUrl: 'views/party/create.html',
        controller: 'PartyCreateController',
        resolve: {
          templates: ['Events', function(Events) {
            return Events.fetchTemplates();
          }],
          type: ['Events', function(Events) {
            return Events.fetchTypes().then(function(types) {
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
      })
      .when('/party/:partyId', {
        templateUrl: 'views/party/party-details.html',
        controller: 'PartyDetailsController',
        resolve: {

        }
      });
  }]);
