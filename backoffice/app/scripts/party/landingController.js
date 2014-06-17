'use strict';

angular.module('fto')
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$window',
    function($scope, events, $route, $window) {
      var recentOutput = [],
        upcomingOutput = [],
        type = $route.current.params.type;

      function isRecent(endTime) {
        var endTimestamp = moment(endTime).unix(),
          nowTimestamp = moment().unix();

        return nowTimestamp > endTimestamp;
      }

      if (events.length === 0){
        $window.location.href = '#/party/overview'
      }

      //change type to upcoming as default
      if (type !== 'upcoming' && type !== 'recent'){
        type = 'upcoming';
      }

      angular.forEach(events, function(event){
        if ( isRecent(event.endTime) ) {
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