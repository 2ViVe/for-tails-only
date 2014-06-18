'use strict';

angular.module('fto/shopping')
  .controller('ShoppingController', ['$scope', 'shopping', '$timeout',
    function($scope, shopping, $timeout) {
      $scope.shopping = shopping;

      $scope.update = function() {
        shopping.update();
      };

      $scope.updateItemQuantity = function(item) {
        var newQuantity = item.newQuantity;
        if (isNaN(newQuantity)) {
          return;
        }
        $timeout(function() {
          if (newQuantity === item.newQuantity) {
            item.quantity = newQuantity;
            shopping.update();
          }
        }, 500);
      };

      $scope.remove = function(item) {
        shopping.removeItem(item);
      };

      $scope.GrandTotal = function() {
        var total = 0;
        angular.forEach(shopping.items, function(item) {
          if (item.data) {
            total += item.data.price * item.quantity;
          }
        });
        return total;
      };

      $scope.checkout = function() {
        shopping.checkout();
      };

      $scope.empty = function() {
        shopping.empty();
      };

      $scope.continueShopping = function() {
        shopping.continueShopping();
      };
    }
  ]);
