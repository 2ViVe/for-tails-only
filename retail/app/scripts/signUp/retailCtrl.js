'use strict';
angular.module('fto/signup')
  .controller('RetailSignUpController', ['$scope', 'Address', 'Registration', 'Dashlize',
    function($scope, Address, Registration, Dashlize) {
      $scope.submitted = false;

      $scope.method = {
        shipping: {},
        payment: {}
      };

      $scope.address = Address.createContainer()
        .addType('shipping');

      $scope.create = function() {
        $scope.submitted = true;
        Registration.createRetail(
          $scope.account.sponsor,
          $scope.account.login,
          $scope.account.password,
          $scope.account.email,
          Dashlize($scope.address.shipping)
        );
      };

    }]);

