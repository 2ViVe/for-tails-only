'use strict';

angular
  .module('fto/checkout')
  .controller('ShippingModalController', ['$scope', '$modalInstance', 'Address',
    function($scope, $modalInstance, Address) {
      $scope.shippingAddress = Address.create('shipping');

      $scope.submit = function() {
        if ($scope.submitted || this.form.$valid) {

          $scope.shippingAddress.validate()
            .then(function() {
              $modalInstance.close($scope.shippingAddress);
            });
        }
        $scope.submitted = true;
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);