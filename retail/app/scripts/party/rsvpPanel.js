'use strict';

angular
  .module('fto/party')
  .directive('rsvpPanel', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        responseTypes: '=',
        initIndex: '=',
        invitees: '=',
        countObject: '='
      },
      templateUrl: 'views/party/rsvp-panel.html',
      controller: ['$scope', function($scope) {
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