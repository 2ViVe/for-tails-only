'use strict';

angular.module('fto')
  //for party view invitation page
  .controller('PartyInvitationController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.partyInviteConfirm = function() {
        $modal.open({
          templateUrl: 'views/party/party-invite-confirm.html',
          controller: 'ModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }])
  .controller('ModalController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);