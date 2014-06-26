'use strict';

angular
  .module('2ViVe')
  .directive('viveSlider', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        nextSlide: '=',
        previousSlide: '=',
        goToSlide: '='
      },
      link: function(scope, element) {
        var slider;
        scope.nextSlide = function() {
          slider.goToNextSlide();
        };
        scope.previousSlide = function() {
          slider.goToPrevSlide();
        };
        scope.goToSlide = function(slideNumber) {
          slider.goToSlide(slideNumber);
        };
        $timeout(function() {
          slider = angular.element(element).find('ul').bxSlider({
            slideWidth: 196,
            minSlides: 2,
            maxSlides: 5,
            pager: false,
            controls: false
          });
        });

      }
    };
  }]);