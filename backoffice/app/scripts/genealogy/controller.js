'use strict';

angular
  .module('fto/genealogy')
  .controller('GenealogyController', ['$scope', 'genealogy',
    function($scope, genealogy) {
      $scope.genealogy = genealogy;

      $scope.changeRootDistributor = function(distributorId) {
        genealogy
          .fetchUniLevels(distributorId)
          .then(function() {
            genealogy.fetchPath(distributorId);
            $scope.refreshPagination(genealogy.data.children.length);
            $scope.refreshSlider();
          });
      };

      $scope.search = function() {
        if (!$scope.searchId) {
          return;
        }
        genealogy
          .fetchUniLevels($scope.searchId)
          .then(function() {
            genealogy.fetchPath($scope.searchId);
            $scope.refreshPagination(genealogy.data.children.length);
            $scope.refreshSlider();
          });
      };
    }
  ]);