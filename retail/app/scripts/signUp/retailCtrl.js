'use strict';
angular.module('fto/signup')
  .controller('RetailSignUpController', ['$scope', 'countries', 'Address', 'Registration',
    function($scope, countries, Address, Registration) {

      $scope.method = {
        shipping: {},
        payment: {}
      };

      $scope.address = Address.createContainer()
        .addType('shipping');

      $scope.account = {
        country: countries.defaultCountry()
      };

      $scope.countries = countries.data;

      $scope.create = function() {

        Registration.createRetail(
          $scope.account.sponsor,
          $scope.account.login,
          $scope.account.password,
          $scope.account.email,
          $scope.address.shipping
        );

      };

    }]);

