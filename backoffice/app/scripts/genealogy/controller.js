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
          });
      };
    }
  ]);