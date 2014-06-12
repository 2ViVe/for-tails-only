'use strict';

angular.module('fto/party')
  .controller('PartyConfirmController', ['$scope', '$modalInstance', 'response',
    function($scope, $modalInstance, response) {
      $scope.data = {
        response: response,
        message: ''
      };
      $scope.submit = function() {
        $modalInstance.close($scope.data);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);