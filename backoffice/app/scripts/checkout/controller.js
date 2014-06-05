'use strict';

angular
  .module('fto/checkout')
  .controller('CheckoutController', ['$scope', 'order', 'Shopping', '$modal', 'User',
    function($scope, order, Shopping, $modal, User) {
      $scope.creditcard = {};
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
        $scope.selectedShippingMethod.id = undefined;
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
        angular.forEach(order.data.adjustments, function(adjustment) {
          adjustments += adjustment.amount;
        });
        return adjustments + order.data.itemTotal;
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
        order.create($scope.selectedPaymentMethod.id, $scope.selectedShippingMethod.id, $scope.creditcard)
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
          })
          .error(function(data) {
            $scope.placingOrder = false;
            $scope.isFailed = true;
            $scope.failedMessage = data.meta.error.message;
          });
      };
    }
  ]
);