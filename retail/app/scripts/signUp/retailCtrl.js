'use strict';
angular.module('fto/signup')
  .controller('RetailSignUpController', ['$scope', '$location', 'Address', 'Registration', 'Dashlize', 'User',
    function($scope, $location, Address, Registration, Dashlize, User) {
      $scope.submitted = false;
      $scope.errors = {};
      $scope.method = {
        shipping: {},
        payment: {}
      };

      $scope.address = Address.createContainer()
        .addType('shipping');

      $scope.create = function() {
        $scope.errors = {};
        $scope.submitted = true;
        Registration.createRetail(
          $scope.account.sponsor,
          $scope.account.login,
          $scope.account.password,
          $scope.account.email,
          Dashlize($scope.address.shipping)
        ).then(function() {
          return User.login($scope.account.login, $scope.account.password, true);
        }, function(resp) {
          debugger;
          var errors = null;
          if (400 === resp.status) {
            errors = resp.data.meta.error.data.failures;
            angular.forEach(errors, function(error) {
              $scope.errors[error.code] = error.message;
            });
            return false;
          }
        }).then(function(result) {
            if (!result) {
              return;
            }
            $location.path('/');
        });
      };

    }]);

