'use strict';

angular.module('fto/party')
  .controller('PartyDetailsController', ['$scope', '$modal', 'event', '$q', '$timeout',
    function($scope, $modal, event, $q, $timeout) {

      $scope.event = event;
      $scope.party = event.data;
      $scope.invitees = event.invitees;

      $scope.rewords = 0;
      $scope.rewordsPercentage = undefined;
      var ordersItemTotal = event.ordersItemTotal();
      if (ordersItemTotal >= 200 && ordersItemTotal < 500) {
        $scope.rewords = ordersItemTotal * 0.1;
        $scope.rewordsPercentage = '10%';
      } else if (ordersItemTotal >= 500 && ordersItemTotal < 750) {
        $scope.rewords = ordersItemTotal * 0.15;
        $scope.rewordsPercentage = '15%';
      } else if (ordersItemTotal >= 750) {
        $scope.rewords = ordersItemTotal * 0.2;
        $scope.rewordsPercentage = '20%';
      }

      $scope.deleteInvites = function() {
        $modal.open({
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
      };

      $scope.openDetail = function(order) {
        $modal.open({
          templateUrl: 'views/party/party-order-details.html',
          controller: 'PartyDetailsModalController',
          windowClass: 'medium',
          resolve: {
            order: function() {
              return order;
            }
          }
        });
      };
    }]);