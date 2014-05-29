'use strict';
angular.module('fto/signup')
  .controller('SignUpController', ['$scope', 'countries', 'Address',
    function($scope, countries, Address) {
      $scope.stepNumber = 3;
      $scope.products = {
        data: {},
        selection: {}
      };

      $scope.address = Address.createContainer()
        .addType('home').addType('shipping').addType('website');

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
