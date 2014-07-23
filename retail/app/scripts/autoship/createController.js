'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipCreateController', ['$scope', 'autoShips', 'address', '$modal', 'AutoShip',
    function($scope, autoShips, address, $modal, AutoShip) {

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
        $scope.error = null;

        $modal.open({
          templateUrl: 'views/auto-ship/checkout.html',
          controller: 'AutoShipCheckoutController',
          resolve: {
            products: function() {
              return $scope.products;
            },
            autoShip: ['$q', function($q) {
              var deferred = $q.defer();

              var autoShip = new AutoShip();
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
              autoShip.address = $scope.address;
              autoShip.orderSummary(autoShipItems,
                $scope.address.shipping,
                $scope.shippingMethod.id)
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
