'use strict';

angular.module('fto/party')
  .controller('PartyDeleteController', ['$scope', 'event', '$modalInstance', '$location', function($scope, event, $modalInstance, $location) {
    $scope.event = event;
    $scope.notification = {};


    $scope.removeEvent = function() {
      var notification;

      if (event.isSendNotification) {
        notification = {
          subject: $scope.notification.subject,
          emails: $scope.event.invitees.filter(function(invitee) {
            return invitee.isNodify;
          }).map(function(invitee) {
            return invitee.email;
          }),
          message: $scope.notification.message
        };
      }

      $scope.event.remove(notification).then(function() {
        $location.path('/party/overview/recent');
        $modalInstance.close($scope.event);
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.toggleEmail = function(invitee) {
      invitee.isNodify = !invitee.isNodify;
    };

  }]);