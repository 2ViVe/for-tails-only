'use strict';

angular.module('fto/party')
  .controller('PartyInviteController', ['$scope', 'Party', 'partyInfo', 'Validator',
    function($scope, Party, partyInfo, Validator) {
      $scope.partyInfo = partyInfo;

      $scope.subject = partyInfo.title;
      $scope.message = partyInfo.message;
      $scope.invitees = [];
      $scope.hasInvalidEmail = false;

      function isEmailNotExited(email) {
        var isNotExited = true;
        angular.forEach($scope.invitees, function(invitee) {
          if (invitee.email === email) {
            isNotExited = false;
            return null;
          }
        });
        return isNotExited;
      }

      $scope.addInvitees = function() {
        $scope.hasInvalidEmail = false;
        var inviteesToBeAdded = $scope.inviteesToBeAdded.split(',');
        var inviteesLeft = [];

        angular.forEach(inviteesToBeAdded, function(inviteeToBeAdded) {
          var email = inviteeToBeAdded;
          var name = email.split('@')[0];
          if (!Validator.isEmail(email)) {
            inviteesLeft.push(email);
            $scope.hasInvalidEmail = true;
          } else if (isEmailNotExited(email)) {
            $scope.invitees.push({
              email: email,
              name: name
            });
          }
        });

        $scope.inviteesToBeAdded = inviteesLeft.join(',');
      };
    }]);
