'use strict';

angular
  .module('fto/genealogy')
  .controller('GenealogyController', ['$scope', 'genealogy',
    function($scope, genealogy) {
      $scope.genealogy = genealogy;

      $scope.changeRootDistributor = function(distributorId, childrenSize) {
        if (childrenSize === 0) {
          return;
        }
        genealogy
          .fetchUniLevels(distributorId)
          .then(function() {
            genealogy.fetchPath(distributorId);
            $scope.currentPage = 1;
            $scope.refreshSlider();
          });
      };

      $scope.currentPage = 1;
    }
  ]);