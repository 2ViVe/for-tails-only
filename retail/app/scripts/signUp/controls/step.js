'use strict';

angular.module('fto/signup')
  .directive('signUpStep', ['$timeout',
    function($timeout) {
      return {
        restrict: 'C',
        link: function(scope, element) {
          angular.element(element).on('submit', function() {
            $timeout(function() {
              console.log(angular.element('.error:visible:eq(0)')[0]);
              angular.element('html, body')
                .animate({scrollTop: angular.element('.error:visible:eq(0)').offset().top - 100}, 100);
            }, 0);
          });
        }
      };
    }]);