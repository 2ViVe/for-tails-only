'use strict';

angular
  .module('fto/genealogy')
  .controller('GenealogyController', ['$scope', 'genealogy',
    function($scope, genealogy) {
      $scope.genealogy = genealogy;
    }
  ]);