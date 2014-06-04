'use strict';
angular.module('fto/signup')
  .controller('RetailSignUpController', ['$scope', 'Address', 'Registration',
    function($scope, Address, Registration) {

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
          $scope.address.shipping
        );
      };

    }]);

