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
      .when('/pawty/:eventId/invitee/:inviteeId/rsvp/:response?', {
        templateUrl: 'views/party/invitation.html',
        controller: 'PartyInvitationController',
        resolve: {
          'event': ['Event', '$route',
            function(Event, $route) {
              var event = new Event($route.current.params.eventId);
              return event.fetch();
            }]
        }
      });
  }]);
