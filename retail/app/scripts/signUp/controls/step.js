'use strict';

angular.module('2ViVe')
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