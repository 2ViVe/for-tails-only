'use strict';

angular
  .module('fto/checkout')
  .controller('CheckoutController', ['$scope', 'order', 'Shopping', '$modal', 'User', '$http',
    function($scope, order, Shopping, $modal, User, $http) {
      $scope.creditcard = {};
      $scope.giftcard = {};
      $scope.placingOrder = false;
      $scope.isSucceed = false;
      $scope.isFailed = false;
      $scope.orderId = null;
      $scope.showShipping = true;

      $scope.selectedShippingMethod = order.currentShippingMethod();
      $scope.selectedPaymentMethod = order.data.availablePaymentMethods[0];
      $scope.order = order;

      if (User.shouldRenew) {
        $scope.showShipping = false;
        order.data.shippingAddress = undefined;
      }

      $scope.editShippingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/shipping-address.html',
          controller: 'ShippingModalController'
        }).result.then(function(shippingAddress) {
            shippingAddress.extendDataTo($scope.order.data.shippingAddress);
            $scope.order.data.shippingAddress.country = shippingAddress.country.name;
            $scope.order.data.shippingAddress.state = shippingAddress.state.name;
            if ($scope.orderId) {
              order.updateShippingAddress($scope.orderId, shippingAddress)
                .success(function() {
                  order.adjustmentsWithOrderId($scope.orderId);
                });
            }
          });
      };

      $scope.editBillingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/billing-address.html',
          controller: 'BillingModalController'
        }).result.then(function(billingAddress) {
            billingAddress.extendDataTo($scope.order.data.billingAddress);
            $scope.order.data.billingAddress.country = billingAddress.country.name;
            $scope.order.data.billingAddress.state = billingAddress.state.name;
            if ($scope.orderId) {
              order.updateBillingAddress($scope.orderId, billingAddress);
            }
          });
      };

      $scope.totalPrice = function() {
        var adjustments = 0;
        var total;
        angular.forEach(order.data.adjustments, function(adjustment) {
          adjustments += adjustment.amount;
        });

        total = adjustments + order.data.itemTotal;

        if ($scope.giftcard.balance) {
          $scope.giftcard.used = $scope.giftcard.balance > total ?
            total : $scope.giftcard.balance;
        }

        $scope.selectedPaymentMethod.isCreditcard = !($scope.giftcard.used === total);

        return total - ($scope.giftcard.used || 0);
      };

      $scope.changeShippingMethod = function(selectedShippingMethod) {
        $scope.selectedShippingMethod = selectedShippingMethod;

        if ($scope.orderId) {
          order.updateShippingAddress($scope.orderId, order.data.shippingAddress, selectedShippingMethod.id)
            .success(function() {
              order.adjustmentsWithOrderId($scope.orderId);
            });
          return null;
        }

        order.adjustments(selectedShippingMethod.id);
      };

      $scope.placeOrder = function() {
        $scope.placingOrder = true;

        if ($scope.selectedPaymentMethod.isCreditcard && !$scope.creditCardForm.$valid) {
          $scope.submitted = true;
          $scope.placingOrder = false;
          return;
        }
        if (!$scope.selectedPaymentMethod.isCreditcard) {
          $scope.creditcard = null;
        }

        var selectedShippingMethodId = $scope.selectedShippingMethod ? $scope.selectedShippingMethod.id : null;

        order.create($scope.selectedPaymentMethod.id, selectedShippingMethodId, $scope.creditcard, $scope.orderId, $scope.giftcard.active ? $scope.giftcard : null)
          .success(function(data) {
            $scope.placingOrder = false;
            $scope.orderId = data.response.orderId;

            if (data.response.paymentState === 'failed') {
              $scope.isFailed = true;
              $scope.failedMessage = 'Process order failed, please check your payment information.';
              return;
            }
            $scope.isSucceed = true;
            $scope.successInfo = data.response;
            Shopping.deleteAll();

            if (User.shouldRenew) {
              User.fetch();
            }
          })
          .error(function(data) {
            $scope.placingOrder = false;
            $scope.isFailed = true;
            $scope.failedMessage = data.meta.error.message;
          });
      };

      $scope.deleteGiftCard = function() {
        $scope.giftcard = {};
      };

      $scope.applyGiftCard = function() {
        function getGiftCardInfo(code, pin) {
          return $http.get('/api/v2/giftcards/' + code + '?pin=' + pin).then(function(resp) {
            return resp.data.response;
          });
        }

        getGiftCardInfo($scope.giftcard.code, $scope.giftcard.pin)
          .then(function(giftcard) {
            delete $scope.giftcard.error;
            angular.extend($scope.giftcard, giftcard);
          }, function(resp) {
            $scope.giftcard.error = resp.data.meta.error.message;
          });
      };
      
    }
  ]
);