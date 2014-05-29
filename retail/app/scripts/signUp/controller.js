'use strict';
angular.module('fto/signup')
  .controller('SignUpController', ['$scope', 'countries',
    function($scope, countries) {
      $scope.stepNumber = 3;
      $scope.products = {
        data: {},
        selection: {}
      };

      $scope.address = {
        home: {},
        shipping: {},
        website: {}
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

      $scope.debug = function() {
        $scope.account.birthday = '1984-05-03';
        $scope.account.socialSecurityNumber = '123456789';
        $scope.address.home.firstName = '123';
        $scope.address.home.lastName = '123';
        $scope.address.home.street = '123';
        $scope.address.home.city = 'ABBEVILLE';
//        $scope.address.home.state = $scope.address.country.states[0];
        $scope.address.home.zip = '36310';
        $scope.address.home.phone = '123';
      };

      $scope.debug();
    }]);
