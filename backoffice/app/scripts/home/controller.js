'use strict';

angular.module('fto/home')
  .controller('HomeController', ['$scope', 'orders',
    function($scope, orders) {
      $scope.orders = orders;
    }]);
