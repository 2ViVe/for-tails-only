'use strict';

angular.module('2ViVe')
  .controller('handlerController', ['$scope', '$location', 'Handlers', function($scope, $location, Handlers) {
    $scope.submit = function(){
      Handlers.fetch($scope.microchipId, $scope.firstName, $scope.lastName).then(function(results){
        $scope.results = results;
      });

    };
    $scope.results = [];
  }]);