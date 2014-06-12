'use strict';

angular.module('fto')
  .controller('PartyDetailsController', ['$scope', '$modal', 'event',
    function($scope, $modal, event) {

      $scope.event = event;
      $scope.party = event.data;
      $scope.invitees = event.invitees;

      $scope.orderDetails = function() {
        $modal.open({
          templateUrl: 'views/party/party-order-details.html',
          controller: 'ModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);