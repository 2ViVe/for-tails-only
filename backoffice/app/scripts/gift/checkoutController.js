'use strict';

angular
  .module('fto/gift')
  .controller('GiftCheckoutController', ['$scope', 'GiftCard',
    function($scope, GiftCard) {
      $scope.creditcard = {};
      $scope.placingOrder = false;
      $scope.error = '';

      var giftCard = new GiftCard();
      giftCard.populate();
      $scope.lineItems = [giftCard.selectedGiftCard];

      $scope.placeOrder = function() {
        $scope.submitted = true;
        $scope.placingOrder = true;

        if ($scope.paymentForm.$invalid) {
          $scope.placingOrder = false;
          return null;
        }

        giftCard.placeOrder($scope.creditcard).success(function(data) {
          $scope.placingOrder = false;
          $scope.error = '';
          giftCard.clear();
          $scope.isSucceed = true;
          $scope.successInfo = data.response;
        }).error(function(data) {
          $scope.placingOrder = false;
          $scope.error = data.meta.error.message;
        });
      };
    }
  ]);