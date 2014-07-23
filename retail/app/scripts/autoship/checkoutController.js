'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipCheckoutController', ['$scope', 'autoShip',
    function($scope, autoShip) {

      $scope.order = autoShip.orderSummary;

    }
  ]
);
