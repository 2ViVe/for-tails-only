'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipCreateController', ['$scope', 'autoShips', 'address',
    function($scope, autoShips, address) {

      autoShips.fetchShippingMethods(address.shipping.country.id, address.shipping.state.id)
        .then(function() {
          $scope.shippingMethods = autoShips.shippingMethods;
          $scope.shippingMethod = $scope.shippingMethods[0];
        });

      $scope.address = address;
      $scope.products = autoShips.products;
      $scope.autoshipDay = 7;
      $scope.startDate = {
        month: 1,
        year: 2014
      };

      $scope.submit = function() {
        
      };

    }
  ]
);
