'use strict';

angular.module('fto/party')
  .controller('PartyInvitationController', ['$scope', 'event', '$modal', '$route',
    function($scope, event, $modal, $route) {
      var inviteeId = $route.current.params.inviteeId;

      $scope.event = event;
      $scope.isChangingReply = false;
      $scope.enableChangingReply = function() {
        $scope.isChangingReply = true;
      };
      $scope.response = function() {
        return event.getInviteeById(inviteeId).response;
      };
      $scope.responseTypes = [
        {
          name: 'YES',
          type: 'YES',
          countName: 'yesCount'
        },
        {
          name: 'MAYBE',
          type: 'MAYBE',
          countName: 'maybeCount'
        },
        {
          name: 'NO',
          type: 'NO',
          countName: 'noCount'
        },
        {
          name: 'NO REPLY YET',
          type: 'NOREPLY',
          countName: 'noReplyCount'
        }
      ];


      $scope.confirm = function(response) {
        $modal.open({
          templateUrl: 'views/party/confirm.html',
          controller: 'PartyConfirmController',
          windowClass: 'medium',
          resolve: {
            response: function() {
              return response;
            },
            event: function() {
              return event;
            },
            inviteeId: function() {
              return inviteeId;
            }
          }
        }).result.then(function() {
            $scope.isChangingReply = false;
          });
      };
    }]);