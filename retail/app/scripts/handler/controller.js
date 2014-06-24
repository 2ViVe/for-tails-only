'use strict';

angular.module('2ViVe')
  .controller('handlerController', ['$scope', '$location', 'Handlers', function($scope, $location, Handlers) {
    $scope.submit = function(){
      Handlers.fetch($scope.microchipId, $scope.firstName, $scope.lastName).then(function(results){
        $scope.results = results;
        $scope.errorMessage = '';
        if (results.length == 0){
          $scope.errorMessage = 'Handler Not Found';
        }
      });

    };
    $scope.changeHandler = function(handler){
      $scope.targetHandler = handler;
    };

    $scope.connect = function(){
      if ($scope.targetHandler !== '') {
        window.location.href = '/' + $scope.targetHandler.login;
      }
    };

    $scope.direct = function(handler){
      window.location.href = '/' + handler.login;
    };

    $scope.results = [];
    $scope.targetHandler = '';
  }]);