'use strict';
angular.module('fto/signup')
  .controller('RetailSignUpController', ['$scope', 'Address', 'Registration', 'Dashlize',
    function($scope, Address, Registration, Dashlize) {

      $scope.method = {
        shipping: {},
        payment: {}
      };

      $scope.address = Address.createContainer()
        .addType('shipping');

      $scope.create = function() {

        Registration.createRetail(
          $scope.account.sponsor,
          $scope.account.login,
          $scope.account.password,
          $scope.account.email,
          Dashlize($scope.address.shipping)
        );
      };

    }]);

