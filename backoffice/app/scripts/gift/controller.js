'use strict';

angular.module('fto/gift')
  .controller('GiftController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.preview = function() {
        $modal.open({
          templateUrl: '/views/gift/preview.html',
          scope: $scope
        });
      };
    }]);
