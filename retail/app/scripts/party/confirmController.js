'use strict';

angular.module('fto/party')
  .controller('PartyConfirmController', ['$scope', '$modalInstance', 'response', 'event', 'inviteeId', '$q',
    function($scope, $modalInstance, response, event, inviteeId, $q) {
      $scope.data = {
        response: response,
        message: ''
      };
      $scope.submit = function() {
        $q.all([event.response(inviteeId, $scope.data.response, $scope.data.message),
          event.fetch(),
          event.fetchInvitees()
        ]).then(function() {
          $modalInstance.close();
        });
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);