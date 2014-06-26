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
        refresh: '=',
        slideWidth: '@',
        minSlides: '@',
        maxSlides: '@',
        pager: '@',
        controls: '@'
      },
      link: function(scope, element) {
        function initSlider() {
          $timeout(function() {
            if (slider) {
              slider.reloadSlider();
            }
            else {
              slider = angular.element(element).find('ul').bxSlider(options);
            }
          });
        }

        var slider;
        var optionKeys = ['slideWidth', 'minSlides', 'maxSlides', 'pager', 'controls'];
        var options = {};
        angular.forEach(optionKeys, function(key) {
          var optionValue = scope[key];
          if (optionValue === 'true') {
            options[key] = true;
          } else if (optionValue === 'false') {
            options[key] = false;
          } else {
            options[key] = optionValue;
          }
        });
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