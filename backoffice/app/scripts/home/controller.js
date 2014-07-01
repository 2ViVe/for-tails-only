'use strict';

angular.module('fto/home')
  .controller('HomeController', ['$scope', 'orders', 'summary', 'user',
    function($scope, orders, summary, user) {
      $scope.orders = orders;
      $scope.summary = summary;
      $scope.user = user;
    }]);
