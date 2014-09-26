'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipCreateController', ['$scope', 'autoShips', 'address', '$modal', 'AutoShip', '$location',
    function($scope, autoShips, address, $modal, AutoShip, $location) {

      var autoShip = new AutoShip();
      autoShip.roleCode = '';
      autoShip.address = address;
      autoShip.autoShipDay = 7;
      autoShip.startDate = {
        month: 1,
        year: 2014
      };
      $scope.autoShip = autoShip;
      $scope.autoShips = autoShips;
      $scope.refreshProducts = function() {
        autoShips.fetchProducts(autoShip.roleCode);
      };
      autoShips.fetchShippingMethods(address.shipping.country.id, address.shipping.state.id)
        .then(function() {
          $scope.shippingMethods = autoShips.shippingMethods;
          $scope.autoShip.shippingMethod = $scope.shippingMethods[0];
        });

      $scope.products = autoShips.products;

      $scope.updateItemQuantity = function(item) {
        var newQuantity = item.newQuantity;
        if (isNaN(newQuantity) || newQuantity < 0) {
          item.newQuantity = item.quantity;
        } else {
          item.newQuantity = parseInt(newQuantity);
          item.quantity = item.newQuantity;
        }
      };

      $scope.editShippingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/shipping-address.html',
          controller: 'ShippingModalController'
        }).result.then(function(shippingAddress) {
            shippingAddress.extendDataTo(autoShip.address.shipping);
          });
      };

      $scope.editBillingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/billing-address.html',
          controller: 'BillingModalController'
        }).result.then(function(billingAddress) {
            billingAddress.extendDataTo(autoShip.address.billing);
          });
      };

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
              return autoShips.products;
            },
            autoShip: ['$q', function($q) {
              var deferred = $q.defer();

              var autoShipItems = [];
              angular.forEach(autoShips.products, function(product) {
                angular.forEach(product.variants, function(variant) {
                  if (variant.quantity && variant.quantity > 0) {
                    autoShipItems.push({
                      variantId: variant.id,
                      quantity: variant.quantity,
                      roleCode: autoShip.roleCode === '' ? undefined : autoShip.roleCode
                    });
                  }
                });
              });
              autoShip.autoShipItems = autoShipItems;
              autoShip.fetchOrderSummary()
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
        }).result.then(function() {
            $location.path('/autoship');
          });
      };

    }
  ]
);
