'use strict';

angular
  .module('fto/party')
  .directive('accordianPartyPanel', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        title: '@',
        type: '@',
        initState: '=',
        invitees: '=',
        count: '='
      },
      templateUrl: 'views/party/party-detail-accordian.html',
      controller: ['$scope', function($scope) {
        $scope.isShow = $scope.initState;

        $scope.toggle = function() {
          $scope.isShow = !$scope.isShow;
        };
      }]
    };
  });