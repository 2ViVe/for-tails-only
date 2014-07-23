'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipsController', ['$scope', 'autoShips', '$modal', 'AutoShip',
    function($scope, autoShips, $modal, AutoShip) {

      $scope.autoShips = autoShips;

      $scope.cancel = function(autoShip) {
        var _autoShip = new AutoShip();
        _autoShip.id = autoShip.id;
        _autoShip.cancel()
          .then(function() {
            autoShip.state = 'cancelled';
          });
      };

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
