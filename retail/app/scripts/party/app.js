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
          'event': ['Event', '$route', '$q',
            function(Event, $route, $q) {
              var deferred = $q.defer();

              var id = $route.current.params.eventId;
              var event = new Event(id);
              $q.all([event.fetch(), event.fetchInvitees()])
                .then(function() {
                  deferred.resolve(event);
                })
                .catch(function(error) {
                  deferred.reject(error);
                });

              return deferred.promise;
            }]
        }
      });
  }]);
