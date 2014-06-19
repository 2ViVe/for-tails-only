'use strict';

angular.module('2ViVe')
  .controller('handlerController', ['$scope', '$location', function($scope, $location) {
    $scope.submit = function(){
      $location.path('/handler-locate-result').search({
        'microchipId' : $scope.microchipId || '',
        'firstName' : $scope.firstName|| '',
        'lastName' : $scope.lastName|| ''
      });
    };
  }]);