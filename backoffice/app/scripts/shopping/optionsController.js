'use strict';

angular.module('fto/shopping')
  .controller('ShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location',
    function($scope, events, Shopping, $location) {
      $scope.events = events;
      $scope.selectedEvent = events[0];

      $scope.shopForMySelf = function() {
        Shopping.event = null;
        $location.path(Shopping.pathAfterShoppingOptions ?
          Shopping.pathAfterShoppingOptions : '/products/cats/cat-treats');
      };

      $scope.shopForPawTy = function() {
        Shopping.event = $scope.selectedEvent;
        $location.path(Shopping.pathAfterShoppingOptions ?
          Shopping.pathAfterShoppingOptions : '/products/cats/cat-treats');
      };
    }
  ]);
