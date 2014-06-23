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
          'templates': ['Events',
            function(Events) {
              return Events.fetchTemplates();
            }],
          'event': ['Event', '$route',
            function(Event, $route) {
              var id = $route.current.params.eventId;
              var event = new Event(id);
              return event.fetch()
                .then(function() {
                  return event.fetchInvitees();
                })
                .then(function() {
                  return event;
                });
            }]
        }
      });
  }]);
