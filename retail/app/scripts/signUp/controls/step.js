'use strict';

angular.module('fto/signup')
  .directive('signUpStep',
  function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        angular.element(element).on('submit', function() {
          angular.element(element).find('input.ng-invalid:eq(0)').focus();
        });
      }
    };
  });