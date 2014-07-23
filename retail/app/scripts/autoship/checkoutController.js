'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipsController', ['$scope', 'autoShip', 'products',
    function($scope, autoShip, products) {

      $scope.products = products;
      $scope.order = autoShip.orderSummary;

    }
  ]
);
