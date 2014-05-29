'use strict';

angular.module('2ViVe')
  .directive('signUpStep3', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {

        $scope.nextStep = function() {
          $scope.submitted = true;

          if (this.step3.$valid) {
            $scope.address.validate().then(function() {
              $scope.goToNextStep();
            });

          }
        };
      }]
    };
  }]);