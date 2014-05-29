'use strict';

angular.module('2ViVe')
  .directive('signUpStep3', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {

        $scope.debug = function() {
          $scope.account.birthday = '1984-05-03';
          $scope.account.socialSecurityNumber = Math.random().toString().substr(2,9);
          $scope.address.home.firstName = '123';
          $scope.address.home.lastName = '123';
          $scope.address.home.street = '123';
          $scope.address.home.city = 'Fairbanks';
          //        $scope.address.home.state = $scope.address.country.states[0];
          $scope.address.home.zip = '99701';
          $scope.address.home.phone = '123';

          $scope.address.shipping.firstName = '123';
          $scope.address.shipping.lastName = '123';
          $scope.address.shipping.street = '123';
          $scope.address.shipping.city = 'Fairbanks';
          //        $scope.address.shipping.state = $scope.address.country.states[0];
          $scope.address.shipping.zip = '99701';
          $scope.address.shipping.phone = '123';

          $scope.address.website.firstName = '123';
          $scope.address.website.lastName = '123';
          $scope.address.website.phone = '123';
        };

//        $scope.debug();

        if ($scope.address.billing) {
          delete $scope.address.billing;
        }

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