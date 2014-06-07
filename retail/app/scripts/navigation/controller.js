'use strict';

angular.module('fto/navigation', ['2ViVe'])
  .controller('NavigationController', ['$scope', 'Taxons',
    function($scope, Taxons) {
      Taxons.fetch().then(function() {
        $scope.taxons = Taxons.getByPositionBetween(0, 1000);
      });
    }]);
