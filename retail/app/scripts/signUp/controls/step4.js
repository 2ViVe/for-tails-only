'use strict';

angular.module('2ViVe')
  .directive('signUpStep4', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', 'Registration', 'User', function($scope, Registration, User) {

        var lineItems = [
          {
            variantId: $scope.products.selection.variantId,
            quantity: 1
          }
        ];

        $scope.address.addType('billing');

        $scope.creditcard = {};

        Registration.orderSummary(
          $scope.address.home.toJSON(),
          $scope.address.shipping.toJSON(),
          $scope.address.home.toJSON(),
          lineItems,
          $scope.address.website.toJSON())
          .success(function(data) {
            $scope.order = data.response;
            $scope.selectedPaymentMethod = $scope.order.availablePaymentMethods[0];
          });

        $scope.create = function() {
          $scope.paymentFailed = false;
          $scope.submitted = true;
          if (this.step4.$valid) {
            $scope.address.billing.validate().then(function() {
              Registration.create(
                $scope.selectedPaymentMethod.id,
                $scope.account,
                $scope.creditcard,
                $scope.address.home.toJSON(),
                $scope.method.shipping.id,
                $scope.address.shipping.toJSON(),
                $scope.address.billing.toJSON(),
                lineItems,
                $scope.address.website.toJSON())
                .success(function(data) {
                  if (data.response.order.paymentState === 'failed') {
                    $scope.paymentFailed = true;
                    return;
                  }

                  $scope.method.payment = $scope.selectedPaymentMethod;
                  $scope.goToSuccess(data.response);

                  User.login($scope.account.login, $scope.account.password)
                    .success(function() {
                      User.fetch();
                    });
                });
            });

          }
        };
      }]
    };
  }]);