'use strict';

angular.module('fto')
  .controller('PartyDetailsController', ['$scope', '$modal', 'event', '$location', '$q', '$timeout',
    function($scope, $modal, event, $location, $q, $timeout) {

      $scope.event = event;
      $scope.party = event.data;
      $scope.invitees = event.invitees;

      $scope.deleteInvites = function() {
        var modalInstance = $modal.open({
          templateUrl: 'views/party/party-delete-modal.html',
          controller: 'PartyDeleteController',
          windowClass: 'medium',
          scope: $scope,
          resolve: {
            event: function() {
              var deferred = $q.defer();
              $timeout(function() {
                deferred.resolve(event);
              });
              return deferred.promise;
            }
          }
        });

        modalInstance.result.then(function onResult() {
          $location.path('/party');
        }, function onCancel() {
          // do noting
        });
      };

      $scope.orderDetails = function() {
        $modal.open({
          templateUrl: 'views/party/party-order-details.html',
          controller: 'ModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);