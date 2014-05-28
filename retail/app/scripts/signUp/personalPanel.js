'use strict';

angular
  .module('fto/signup')
  .directive('personalPanel', [function() {
    return {
      templateUrl: 'views/sign-up/components/personal-panel.html',
      scope: {
        account: '=',
        submitted: '='
      }
    };
  }]);