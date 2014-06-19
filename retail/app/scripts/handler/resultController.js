'use strict';

angular.module('2ViVe')
  .controller('handlerResultController', ['$scope', 'handlers', function($scope, handlers) {
    console.log(handlers);
    $scope.handlers = handlers;
  }]);