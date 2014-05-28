'use strict';

angular
  .module('fto/signup')
  .directive('sponsorPanel', [function() {
    return {
      templateUrl: 'views/sign-up/components/sponsor-panel.html',
      scope: {
        account: '=',
        submitted: '='
      },
      controller: ['$scope', function($scope) {
        $scope.$errorMessages = {};
      }]
    };
  }]);
