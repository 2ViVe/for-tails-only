'use strict';

angular.module('fto')
  //for party-my page
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$window',
    function($scope, events, $route, $window) {
      var recentOutput = [],
        upcomingOutput = [],
        timeFormat = 'MMMM D,YYYY,h:mma',
        type = $route.current.params.type;

      function isRecent(endTime) {
        var endTimestamp = moment(endTime).unix(),
          nowTimestamp = moment().unix();

        if (nowTimestamp > endTimestamp) {
          return true;
        } else {
          return false;
        }
      }

      //change type to upcoming as default
      if (type !== 'upcoming' && type !== 'recent'){
        type = 'upcoming';
      }

      angular.forEach(events, function(event){
        var output = {};
        output.startTime = moment(event.startTime).format(timeFormat);
        output.endTime = moment(event.endTime).format(timeFormat);
        output.address = [
          event.address.street,
          event.address.city,
          event.address.stateName,
          event.address.countryName,
          event.address.zip
        ].join(' ');
        if ( isRecent(event.endTime) ) {
          recentOutput.push(output);
        } else {
          upcomingOutput.push(output);
        }
      });

      if (type === 'upcoming') {
        $scope.parties = upcomingOutput;
      } else {
        $scope.parties = recentOutput;
      }

      $scope.type = type;

    }]);