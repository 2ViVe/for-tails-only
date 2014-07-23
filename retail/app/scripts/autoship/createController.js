'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipCreateController', ['$scope', 'autoShips', 'address', '$modal', 'AutoShip',
    function($scope, autoShips, address, $modal, AutoShip) {

      var autoShip = new AutoShip();
      autoShip.address = address;
      autoShip.autoShipDay = 7;
      autoShip.startDate = {
        month: 1,
        year: 2014
      };
      $scope.autoShip = autoShip;
      autoShips.fetchShippingMethods(address.shipping.country.id, address.shipping.state.id)
        .then(function() {
          $scope.shippingMethods = autoShips.shippingMethods;
          $scope.autoShip.shippingMethod = $scope.shippingMethods[0];
        });

      $scope.products = autoShips.products;

      $scope.submit = function() {
        $scope.error = null;

        $modal.open({
          templateUrl: 'views/auto-ship/checkout.html',
          controller: 'AutoShipCheckoutController',
          resolve: {
            paymentMethods: function() {
              return autoShips.fetchPaymentMethods(autoShip.address.shipping.country.id)
                .then(function(autoShips) {
                  return autoShips.paymentMethods;
                });
            },
            products: function() {
              return $scope.products;
            },
            autoShip: ['$q', function($q) {
              var deferred = $q.defer();

              var autoShipItems = [];
              angular.forEach($scope.products, function(product) {
                angular.forEach(product.variants, function(variant) {
                  if (variant.quantity && variant.quantity > 0) {
                    autoShipItems.push({
                      variantId: variant.id,
                      quantity: variant.quantity
                    });
                  }
                });
              });
              autoShip.autoShipItems = autoShipItems;
              autoShip.orderSummary()
                .then(function() {
                  deferred.resolve(autoShip);
                })
                .catch(function(response) {
                  $scope.error = response.data.meta.error.message;
                  deferred.reject();
                });

              return deferred.promise;
            }]
          }
        });
      };

    }
  ]
);
