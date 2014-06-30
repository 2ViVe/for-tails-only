'use strict';

angular
  .module('fto/genealogy')
  .controller('GenealogyController', ['$scope', 'genealogy', '$timeout',
    function($scope, genealogy, $timeout) {
      function refresh(distributorId) {
        genealogy
          .fetchUniLevels(distributorId)
          .then(function() {
            $scope.refreshSlider();
            $scope.refreshPagination(genealogy.data.children.length);

            genealogy.fetchPath(distributorId)
              .then(function() {
                $scope.refreshPath();
                $timeout(function() {
                  $scope.refreshPathPagination(genealogy.path.length);
                }, 0);
              });
          });
      }

      $scope.genealogy = genealogy;

      $scope.changeRootDistributor = refresh;

      $scope.search = function() {
        if (!$scope.searchId) {
          return;
        }
        refresh($scope.searchId);
      };
    }
  ]);