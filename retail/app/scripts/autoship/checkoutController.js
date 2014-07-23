'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipCheckoutController', ['$scope', 'autoShip', '$modalInstance', 'paymentMethods',
    function($scope, autoShip, $modalInstance, paymentMethods) {

      $scope.order = autoShip.orderSummary;
      $scope.paymentMethods = paymentMethods;

      $scope.autoShip = autoShip;
      $scope.autoShip.creditcard = {};
      $scope.autoShip.paymentMethod = paymentMethods[0];

      $scope.checkout = function() {
        $scope.submitted = true;

        if (this.paymentForm.$valid) {
          autoShip.create()
            .then(function() {
              $modalInstance.close();
            });
        }
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

    }
  ]
);
