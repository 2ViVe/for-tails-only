'use strict';

angular.module('fto/shopping')
  .controller('ShoppingController', ['$scope', 'shopping', '$timeout',
    function($scope, shopping, $timeout) {
      $scope.shopping = shopping;

      $scope.updateItemQuantity = function(item) {
        var newQuantity = item.newQuantity;
        if (Math.round(newQuantity) === 0) {
          return;
        }
        if (isNaN(newQuantity) || newQuantity < 0) {
          item.newQuantity = item.quantity;
          return;
        }
        $timeout(function() {
          if (newQuantity === item.newQuantity) {
            item.quantity = Math.round(newQuantity);
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
