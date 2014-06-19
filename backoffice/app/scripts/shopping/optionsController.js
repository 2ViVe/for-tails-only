'use strict';

angular.module('fto/shopping')
  .controller('ShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location',
    function($scope, events, Shopping, $location) {
      if (!events && events.length === 0) {
        $location.path('/products/cats/cat-treats');
        return;
      }

      $scope.events = events;
      $scope.selectedEvent = events[0];

      $scope.shopForMySelf = function() {
        Shopping.removeOptionalField('eventCode');
        Shopping.update().then(function() {
          $location.path(Shopping.pathAfterShoppingOptions ?
            Shopping.pathAfterShoppingOptions : '/products/cats/cat-treats');
        });
      };

      $scope.shopForPawTy = function() {
        Shopping.addOptionalFields({
          eventCode: $scope.selectedEvent.id
        });
        Shopping.update().then(function() {
          $location.path(Shopping.pathAfterShoppingOptions ?
            Shopping.pathAfterShoppingOptions : '/products/cats/cat-treats');
        });
      };
    }
  ]);
