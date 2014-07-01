'use strict';

angular.module('2ViVe')
  .directive('calendar', ['$compile', function($compile) {
    return {
      restrict: 'A',
      templateUrl: 'views/party/calendar.html',
      replace: true,
      scope: {
        selectedDate: '=',
        remarks: '='
      },
      link: function(scope, element) {
        var picker = new Pikaday({
          field: angular.element(element).find('.calendar-field')[0],
          container: angular.element(element)[0],
          bound: false,
          onDraw: function() {
            var remarks = scope.remarks;
            var year = picker._y;
            var month = picker._m;
            if (remarks && remarks[year] && remarks[year][month]) {
              var dayRemarks = remarks[year][month];
              angular.forEach(dayRemarks, function(remark, day) {
                $compile(angular.element(picker.el).find('td[data-day="' + day + '"]')
                  .addClass(remark.class)
                  .attr('tooltip-append-to-body', 'true')
                  .attr('tooltip-trigger', 'click')
                  .attr(remark.type, remark.content))(scope);
              });
            }
          }
        });

        var removeEvent = function(el, e, callback, capture) {
          if (!!window.addEventListener) {
            el.removeEventListener(e, callback, !!capture);
          } else {
            el.detachEvent('on' + e, callback);
          }
        };

        removeEvent(picker.el, 'mousedown', picker._onMouseDown, true);
      }
    };
  }]);