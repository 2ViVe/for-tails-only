'use strict';

angular
  .module('fto/autoship')
  .controller('AutoShipsController', ['$scope', 'autoShips',
    function($scope, autoShips) {

      $scope.autoShips = autoShips;

    }
  ]
);
