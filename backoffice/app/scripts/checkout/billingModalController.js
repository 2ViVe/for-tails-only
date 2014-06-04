'use strict';

angular
  .module('fto/checkout')
  .controller('BillingModalController', ['$scope', '$modalInstance', 'Address',
    function($scope, $modalInstance, Address) {
      $scope.billingAddress = Address.create('billing');

      $scope.submit = function() {
        if ($scope.submitted || this.form.$valid) {

          $scope.shippingAddress.validate()
            .then(function() {
              $modalInstance.close($scope.billingAddress);
            });
        }
        $scope.submitted = true;
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);