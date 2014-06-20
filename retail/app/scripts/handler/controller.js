'use strict';

angular.module('2ViVe')
  .controller('handlerController', ['$scope', '$location', 'Handlers', function($scope, $location, Handlers) {
    $scope.submit = function(){
      Handlers.fetch($scope.microchipId, $scope.firstName, $scope.lastName).then(function(results){
        $scope.results = results;
      });

    };
    $scope.changeHandler = function(handler){
      $scope.targetHandler = handler;
    };

    $scope.connect = function(){
      if ($scope.targetHandler !== '') {
        $location.path('/' + $scope.targetHandler.login);
      }
    };
    $scope.results = [];
    $scope.targetHandler = '';
  }]);