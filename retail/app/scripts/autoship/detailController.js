'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipDetailController', ['$scope', 'autoShip', '$modalInstance',
    function($scope, autoShip, $modalInstance) {

      $scope.autoShip = autoShip;

      $scope.close = function() {
        $modalInstance.dismiss();
      };

    }
  ]
);
