'use strict';

angular.module('fto')
  .controller('PartyDetailsController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.orderDetails = function() {
        $modal.open({
          templateUrl: 'views/party/party-order-details.html',
          controller: 'ModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);