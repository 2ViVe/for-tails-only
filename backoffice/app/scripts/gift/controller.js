'use strict';

angular.module('fto/gift')
  .controller('GiftController', ['$scope', '$modal', 'giftCard', '$filter',
    function($scope, $modal, giftCard, $filter) {
      $scope.giftCards = giftCard.data;
      $scope.currentTheme = giftCard.data[0];
      $scope.currentGiftCard = '';
      $scope.emailInfo = {};
      $scope.submitted = false;

      $scope.changeTheme = function(theme) {
        $scope.currentTheme = theme;
        $scope.currentGiftCard = '';
      };

      $scope.minPrice = function() {
        return $filter('orderBy')($scope.currentTheme.variants, 'price')[0];
      };

      $scope.maxPrice = function() {
        var varaiants = $scope.currentTheme.variants;
        return $filter('orderBy')(varaiants, 'price')[varaiants.length - 1];
      };

      $scope.purchase = function() {
        $scope.submitted = true;
        if ($scope.emailForm.$invalid || $scope.currentGiftCard === '') {
          return null;
        }

        giftCard.purchase($scope.selectedGiftCard, $scope.emailForm);
      };

      $scope.preview = function() {
        $modal.open({
          templateUrl: '/views/gift/preview.html',
          controller: 'GiftModalController',
          scope: $scope
        });
      };
    }]);
