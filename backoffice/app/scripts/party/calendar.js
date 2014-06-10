'use strict';

angular.module('2ViVe')
  .directive('calendar', function() {
    return {
      restrict: 'A',
      templateUrl: 'views/party/calendar.html',
      replace: true,
      scope: {
        selectedDate: '='
      },
      link: function(scope, element) {
        new Pikaday({
          field: angular.element(element).find('.calendar-field')[0],
          container: angular.element(element)[0],
          bound: false
        });
      }
    };
  });