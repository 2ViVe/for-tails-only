'use strict';

angular.module('fto/party')
  .controller('PartyDeleteController', ['$scope', 'event', '$modalInstance',function($scope, event, $modalInstance) {
    debugger;
    $scope.event = event;

    $scope.removeEvent = function() {
      $scope.event.remove().then(function() {
        $modalInstance.close($scope.event);
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }]);