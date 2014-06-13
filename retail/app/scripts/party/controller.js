'use strict';

angular.module('fto/party')
  .controller('PartyInvitationController', ['$scope', 'event', '$modal', '$route', 'templates',
    function($scope, event, $modal, $route, templates) {
      var inviteeId = $route.current.params.inviteeId;

      $scope.event = event;
      $scope.isChangingReply = false;
      $scope.enableChangingReply = function() {
        $scope.isChangingReply = true;
      };
      $scope.response = function() {
        return event.getInviteeById(inviteeId).response;
      };
      angular.forEach(templates, function(template) {
        if (template.id === event.data.templateId) {
          $scope.templateImageUrl = template.imageUrl;
        }
      });


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