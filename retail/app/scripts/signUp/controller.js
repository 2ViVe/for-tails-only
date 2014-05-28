'use strict';
angular.module('fto/signup')
  .controller('SignUpController', ['$scope', 'countries',
    function($scope, countries) {
      $scope.stepNumber = 1;
      $scope.products = {
        data: {},
        selection: {}
      };

      $scope.account = {
        country: countries.defaultCountry()
      };

      $scope.goToNextStep = function() {
        $scope.stepNumber++;
      };

      $scope.countries = countries.data;

      $scope.goToStep = function(stepNumber) {
        if (stepNumber !== $scope.stepNumber) {
          $scope.stepNumber = stepNumber;
        }
      };
    }]);