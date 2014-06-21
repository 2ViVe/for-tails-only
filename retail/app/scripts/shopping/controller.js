'use strict';

angular.module('fto/shopping')
  .controller('ShoppingController', ['$scope', 'shopping', '$timeout', '$location',
    function($scope, shopping, $timeout, $location) {
      $scope.shopping = shopping;

      $scope.updateItemQuantity = function(item) {
        var newQuantity = item.newQuantity;
        if (isNaN(newQuantity) || newQuantity <= 0) {
          item.newQuantity = item.quantity;
          return;
        }
        $timeout(function() {
          if (newQuantity === item.newQuantity) {
            item.quantity = newQuantity;
            shopping.updateItems();
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
        $location.path('/shopping-options');
      };

      $scope.empty = function() {
        shopping.empty();
      };

      $scope.continueShopping = function() {
        shopping.continueShopping();
      };
    }
  ]);
