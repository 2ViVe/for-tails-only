'use strict';

angular
  .module('2ViVe')
  .directive('viveSlider', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        nextSlide: '=',
        previousSlide: '=',
        goToSlide: '=',
        refresh: '='
      },
      link: function(scope, element) {
        function initSlider() {
          $timeout(function() {
            if (slider) {
              slider.reloadSlider();
            }
            else {
              slider = angular.element(element).find('ul').bxSlider({
                slideWidth: 194,
                minSlides: 2,
                maxSlides: 5,
                pager: false,
                controls: false
              });
            }
          });
        }

        var slider;
        scope.nextSlide = function() {
          slider.goToNextSlide();
        };
        scope.previousSlide = function() {
          slider.goToPrevSlide();
        };
        scope.goToSlide = function(slideNumber) {
          slider.goToSlide(slideNumber - 1);
        };
        scope.refresh = function() {
          initSlider();
        };

        initSlider();

      }
    };
  }]);