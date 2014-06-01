'use strict';

angular.module('fto')
  .controller('GiftPopupController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.preview = function() {
        $modal.open({
          templateUrl: '/views/products/products-gift-preview.html',
          controller: 'ModalController',
          scope: $scope
        });
      };
    }])
  .controller('ModalController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);