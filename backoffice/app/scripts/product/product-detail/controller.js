'use strict';

angular.module('fto')
  .controller('ProductAccordion', ['$scope',
    function($scope) {
      $scope.oneAtATime = true;
      $scope.isopen1 = true;

      $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
      };
    }]);
