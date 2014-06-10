'use strict';

angular.module('fto/footer', ['2ViVe'])
  .controller('FooterController', ['$scope', 'Taxons',
    function($scope, Taxons) {
      Taxons.fetch().then(function() {
        $scope.taxons = Taxons.getByPositionBetween(0, 1000);
      });
    }]);
