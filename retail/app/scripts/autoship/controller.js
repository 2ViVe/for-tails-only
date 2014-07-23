'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipsController', ['$scope', 'autoShips', '$modal',
    function($scope, autoShips, $modal) {

      $scope.autoShips = autoShips;

      $scope.showDetails = function(autoShip) {
        $modal.open({
          templateUrl: 'views/auto-ship/detail.html',
          controller: 'AutoShipDetailController',
          resolve: {
            autoShip: function() {
              return autoShip;
            }
          }
        });
      };

    }
  ]
);
