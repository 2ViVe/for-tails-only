'use strict';

angular.module('fto')
  //for party-my page
  .controller('PartyLandingController', ['$scope', 'events',
    function($scope, events) {
      var output = [],
        timeFormat = 'MMMM D,YYYY,h:mma';

      angular.forEach(events, function(event){
        event.startTime = moment(event.startTime).format(timeFormat);
        event.endTime = moment(event.endTime).format(timeFormat);
        event.address = [
          event.address.street,
          event.address.city,
          event.address.stateName,
          event.address.countryName,
          event.address.zip
        ].join(' ');
        output.push(event);
      });

      $scope.parties = output;
    }]);