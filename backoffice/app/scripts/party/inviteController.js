'use strict';

angular.module('fto/party')
  .controller('PartyInviteController', ['$scope', 'Party', 'partyInfo',
    function($scope, Party, partyInfo) {
      $scope.partyInfo = partyInfo;

      $scope.subject = partyInfo.title;
      $scope.message = partyInfo.message;
    }]);
