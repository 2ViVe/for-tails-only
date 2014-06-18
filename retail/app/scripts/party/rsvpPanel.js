'use strict';

angular
  .module('fto/party')
  .directive('rsvpPanel', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        initIndex: '=',
        invitees: '=',
        event: '='
      },
      templateUrl: 'views/party/rsvp-panel.html',
      controller: ['$scope', function($scope) {
        $scope.responseTypes = [
          {
            name: 'YES',
            type: 'YES',
            countName: 'yesCount'
          },
          {
            name: 'MAYBE',
            type: 'MAYBE',
            countName: 'maybeCount'
          },
          {
            name: 'NO',
            type: 'NO',
            countName: 'noCount'
          },
          {
            name: 'NO REPLY YET',
            type: 'NOREPLY',
            countName: 'noReplyCount'
          }
        ];

        $scope.toggle = function(responseType) {
          var isShown = responseType.isShown;
          angular.forEach($scope.responseTypes, function(responseType) {
            responseType.isShown = false;
          });
          responseType.isShown = !isShown;
        };
      }]
    };
  });