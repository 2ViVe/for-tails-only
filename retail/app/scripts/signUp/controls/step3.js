'use strict';

angular.module('2ViVe')
  .directive('signUpStep3', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', 'Address', function($scope, Address) {
        $scope.nextStep = function() {
          $scope.submitted = true;
          if (this.step3.$valid) {
            var addressContainer = Address.createContainer();
            addressContainer.extend($scope.address);
            addressContainer.validate().then(function(data) {
              console.log(data);
            }).catch(function(data) {
              console.log(data);
            });
//            $scope.goToNextStep();
          }
        };
      }]
    };
  }]);