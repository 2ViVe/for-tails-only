'use strict';

angular
  .module('fto/party')
  .filter('responseIs', function() {
    return function(invitees, responseType) {
      return invitees.filter(function(invitee) {
        return invitee.response === responseType;
      });
    };
  });
