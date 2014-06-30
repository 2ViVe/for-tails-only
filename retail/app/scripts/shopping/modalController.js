'use strict';

angular.module('fto/shopping')
  .controller('ShoppingModalController', ['$scope', 'shopping', '$modalInstance', '$timeout', '$location',
    function($scope, shopping, $modalInstance, $timeout, $location) {
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

      $scope.empty = function() {
        shopping.empty();
      };

      $scope.continueShopping = function() {
        $modalInstance.dismiss('cancel');
      };

      $scope.checkout = function() {
        $modalInstance.dismiss('cancel');
        $location.path('/shopping-options');
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
