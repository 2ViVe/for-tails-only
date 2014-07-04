'use strict';

angular.module('fto/product')
  .controller('SearchController', ['$scope', 'data', '$route',
    function($scope, data, $route) {
      $scope.products = data.products;
      $scope.query = $route.current.params.query;
    }]);