'use strict';

angular.module('fto/product')
  .controller('SearchController', ['$scope', 'data', '$route', 'Products',
    function($scope, data, $route, Products) {
      $scope.fetchData = function(page) {
        Products.fetch({
          q: $scope.query,
          offset: (page - 1) * $scope.limit
        }).then(function(data) {
          $scope.data = data;
        });
      };

      $scope.data = data;
      $scope.query = $route.current.params.query;
      $scope.limit = 20;
    }]);