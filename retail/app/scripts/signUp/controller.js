'use strict';
angular.module('fto/signup')
  .controller('SignUpController', ['$routeParams', '$scope', 'countries',
    function($routeParams, $scope, countries) {
      $scope.stepNumber = $routeParams.stepNumber;

      $scope.registrationCountryChange = function() {

      };

      $scope.account = {
        country: countries.defaultCountry()
      };

      $scope.countries = countries.data;

      $scope.submitAndGoToStep = function(stepNumber, isFormValid) {
        $scope.submitted = true;
        if (isFormValid) {
        }
      };
      $scope.goToStep = function(stepNumber) {
        if (stepNumber !== $scope.stepNumber) {
        }
      };
    }]);