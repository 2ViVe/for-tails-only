'use strict';

angular.module('2ViVe')
  .controller('TrainController', ['$scope', 'tools', function($scope, tools) {
    $scope.filesArr = tools;
  }]);