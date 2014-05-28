'use strict';

angular
  .module('fto/signup')
  .directive('personalPanel', [function() {
    return {
      templateUrl: 'views/sign-up/components/personal-panel.html',
      scope: {
        account: '=',
        submitted: '='
      },
      controller: ['$scope', function($scope) {
        $scope.isUseSSN = true;
        $scope.$watch('account.socialSecurityNumber', function(SSN) {
          if ($scope.isUseSSN) {
            $scope.account.taxId = SSN;
          }
        });
      }]
    };
  }]);