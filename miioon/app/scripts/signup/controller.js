'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', 'Registration',
    function($scope, Registration) {
      $scope.currentStepNumber = 1;
      $scope.completedStepNumber = 1;
      $scope.shouldValidateRemotlyOnSubmit = false;
      $scope.isRemoteValidated = false;
      $scope.submitted = false;
      $scope.account = {};
      $scope.payment = {};
      $scope.userInfo = {};

      function goToNextStep() {
        $scope.currentStepNumber++;
        if ($scope.currentStepNumber > $scope.completedStepNumber) {
          $scope.completedStepNumber = $scope.currentStepNumber;
        }
      }

      function validateStep(step, onValidated) {
        $scope.submitted = true;
        if (step.$valid) {
          if ($scope.shouldValidateRemotlyOnSubmit) {
            var destroyIsRemoteValidatedWatch = $scope.$watch('isRemoteValidated', function(isRemoteValidated) {
              if (isRemoteValidated) {
                destroyIsRemoteValidatedWatch();
                $scope.isRemoteValidated = false;
                onValidated();
              }
            });
          } else {
            onValidated();
          }
        }
      }

      $scope.submit = function() {
        validateStep(this.step, function() {
          Registration.create();
        });
      };

      $scope.nextStep = function() {
        validateStep(this.step, goToNextStep);
      };

      $scope.goToStep = function(stepNumber) {
        if (stepNumber <= $scope.completedStepNumber) {
          $scope.currentStepNumber = stepNumber;
        }
      };

      $scope.moreThanOld18 = function(date) {
        return moment(date).add(18, 'years').isBefore(moment());
      };
    }]);