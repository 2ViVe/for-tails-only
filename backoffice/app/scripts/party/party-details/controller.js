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
      if (ordersItemTotal >= 200 && ordersItemTotal < 299) {
        $scope.rewords = 15;
      } else if (ordersItemTotal >= 300 && ordersItemTotal < 399) {
        $scope.rewords = 25;
      } else if (ordersItemTotal >= 400 && ordersItemTotal < 499) {
        $scope.rewords = 45;
      } else if (ordersItemTotal >= 500 && ordersItemTotal < 799) {
        $scope.rewords = 60;
      } else if (ordersItemTotal >= 800 && ordersItemTotal < 999) {
        $scope.rewords = 90;
      } else if (ordersItemTotal >= 1000) {
        $scope.rewords = 115;
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