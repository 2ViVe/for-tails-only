'use strict';

angular.module('fto/party')
  .controller('PartyInvitationController', ['$scope', 'event', '$modal', '$route',
    function($scope, event, $modal, $route) {
      var inviteeId = $route.current.params.inviteeId;

      $scope.event = event.data;
      $scope.invitees = event.invitees;
      $scope.isChangingReply = false;
      $scope.enableChangingReply = function() {
        $scope.isChangingReply = true;
      };
      $scope.response = event.getInviteeById(inviteeId).response.toUpperCase();
      $scope.responseTypes = [
        {
          name: 'YES',
          type: 'YES',
          count: event.data.yesCount
        },
        {
          name: 'MAYBE',
          type: 'MAYBE',
          count: event.data.maybeCount
        },
        {
          name: 'NO',
          type: 'NO',
          count: event.data.noCount
        },
        {
          name: 'NO REPLY YET',
          type: 'NOREPLY',
          count: event.data.noReplyCount
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
            }
          }
        }).result.then(function(data) {
            $scope.response = data.response.toUpperCase();
            $scope.isChangingReply = false;
            event.response(inviteeId, data.response, data.message);
          });
      };
    }]);