'use strict';

angular.module('fto/home')
  .controller('HomeController', ['$scope', 'orders', 'summary',
    function($scope, orders, summary) {
      $scope.orders = orders;
      $scope.summary = summary;
    }]);
