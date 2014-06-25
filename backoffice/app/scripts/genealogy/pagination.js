'use strict';

angular.module('2ViVe')
  .filter('pagination', function() {
    return function(items, currentPage, numberPerPage) {
      var begin = (currentPage - 1) * numberPerPage,
        end = begin + numberPerPage;
      return items.slice(begin, end);
    };
  })
  .directive('vivePagination', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/report/pagination.html',
      scope: {
        numberPerPage: '=',
        currentPage: '=',
        total: '='
      },
      controller: ['$scope', function($scope) {
        function calculatePage(total) {
          $scope.pageNumber = Math.ceil(total / $scope.numberPerPage);

          $scope.pages = [];
          for (var i = 1; i <= $scope.pageNumber; i++) {
            $scope.pages.push(i);
          }
        }

        $scope.$watch('total', calculatePage);

        $scope.goTo = function(page) {
          $scope.currentPage = page;
        };

        $scope.previousPage = function() {
          if ($scope.currentPage > 1) {
            $scope.currentPage--;
          }
        };

        $scope.nextPage = function() {
          if ($scope.currentPage < $scope.pageNumber) {
            $scope.currentPage++;
          }
        };
      }]
    };
  });