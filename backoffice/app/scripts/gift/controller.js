'use strict';

angular.module('fto/gift')
  .controller('GiftController', ['$scope', '$modal', 'giftCard',
    function($scope, $modal, giftCard) {
      $scope.giftCards = giftCard.data;
      $scope.currentTheme = giftCard.data[0];
      $scope.currentGiftCard = '';

      $scope.changeTheme = function(theme) {
        $scope.currentTheme = theme;
      };

      $scope.preview = function() {
        $modal.open({
          templateUrl: '/views/gift/preview.html',
          controller: 'GiftModalController',
          scope: $scope
        });
      };
    }]);
