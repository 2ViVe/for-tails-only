'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerOrderController', ['$scope', 'customers',
    function($scope, customers) {
      $scope.customers = customers;
      $scope.count = customers.orders.pagination.count;

      $scope.goToPage = function(page, offset, limit) {
        customers.fetchOrders(offset, limit)
          .then(function() {
            $scope.refreshPagination(customers.orders.pagination.count);
          });
      };
    }
  ]
);