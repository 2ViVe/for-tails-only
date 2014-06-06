'use strict';

angular.module('fto/signup')
  .directive('signUpStep2', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.nextStep = function() {
          $scope.submitted = true;
          if (this.step2.$valid) {
            $scope.goToNextStep();
          }
        };
      }]
    };
  }]);