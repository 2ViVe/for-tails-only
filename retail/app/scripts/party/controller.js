'use strict';

angular.module('fto/party')
  .controller('PartyInvitationController', ['$scope', 'event', '$modal', '$route',
    function($scope, event, $modal, $route) {
      $scope.event = event.data;

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
            event.response($route.current.params.inviteeId, data.response, data.message);
          });
      };
    }]);