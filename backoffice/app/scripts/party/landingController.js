'use strict';

angular.module('fto')
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$location',
    function($scope, events, $route, $location) {
      var period = $route.current.params.period;

      function handleRemarks(event) {
        var startTime = moment(event.startTime);
        var content = '<a href="#/party/' + event.id + '">' + event.title + '</a>';
        if ($scope.remarks[startTime.year()] === undefined) {
          $scope.remarks[startTime.year()] = {};
        }
        if ($scope.remarks[startTime.year()][startTime.month()] === undefined) {
          $scope.remarks[startTime.year()][startTime.month()] = {};
        }
        if ($scope.remarks[startTime.year()][startTime.month()][startTime.date()] === undefined) {
          $scope.remarks[startTime.year()][startTime.month()][startTime.date()] = {
            class: 'has-event',
            content: content,
            type: 'tooltip-html-unsafe',
            appendToBody: 'false',
            trigger: 'click'
          };
        } else {
          var remark = $scope.remarks[startTime.year()][startTime.month()][startTime.date()];
          remark.content += '<br>' + content;
        }
      }

      if (events.length === 0) {
        $location.path('/party/overview');
      }

      //change period to upcoming as default
      if (period !== 'upcoming' && period !== 'recent') {
        period = 'upcoming';
      }

      $scope.remarks = {};

      angular.forEach(events, handleRemarks);

      $scope.parties = events;

      $scope.period = period;

    }]);