'use strict';

angular.module('fto')
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$location',
    function ($scope, events, $route, $location) {
      var recentOutput = [],
        upcomingOutput = [],
        type = $route.current.params.type;

      function isRecent(endTime) {
        return moment(endTime).isBefore(new Date());
      }

      if (events.length === 0) {
        $location.path('/party/overview');
      }

      //change type to upcoming as default
      if (type !== 'upcoming' && type !== 'recent') {
        type = 'upcoming';
      }

      angular.forEach(events, function (event) {
        if (isRecent(event.endTime)) {
          recentOutput.push(event);
        } else {
          upcomingOutput.push(event);
        }
      });

      if (type === 'upcoming') {
        $scope.parties = upcomingOutput;
      } else {
        $scope.parties = recentOutput;
      }

      $scope.type = type;

    }]);