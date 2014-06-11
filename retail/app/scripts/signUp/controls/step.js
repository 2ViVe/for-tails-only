'use strict';

angular.module('fto/signup')
  .directive('signUpStep', ['$timeout',
    function($timeout) {
      return {
        restrict: 'C',
        link: function(scope, element) {
          angular.element(element).on('submit', function() {
            $timeout(function() {
              var errorElement = angular.element('.error:visible:eq(0)');
              if (errorElement.length > 0) {
                angular.element('html, body')
                  .animate({scrollTop: errorElement.offset().top - 100}, 100);
              }
            }, 0);
          });
        }
      };
    }]);