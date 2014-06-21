'use strict';

angular.module('fto/shopping')
  .controller('ShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location', 'User', 'LocalStorage',
    function($scope, events, Shopping, $location, User, LocalStorage) {
      User.fetch(function() {
        if (!User.isLogin) {
          LocalStorage.pathAfterLogin('/shopping-options');
          $location.path('/signin');
        }
      });

      if (!events && events.length === 0) {
        $location.path('/products/cats/cat-treats');
        return;
      }

      $scope.events = events;
      $scope.selectedEvent = events[0];

      $scope.shopForMySelf = function() {
        Shopping.removeOptionalField('eventCode');
        Shopping.update().then(function() {
          $location.path('/checkout');
        });
      };

      $scope.shopForPawTy = function() {
        Shopping.addOptionalFields({
          eventCode: $scope.selectedEvent.id
        });
        Shopping.update().then(function() {
          $location.path('/checkout');
        });
      };
    }
  ]);
