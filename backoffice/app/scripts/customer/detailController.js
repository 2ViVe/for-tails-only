'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerDetailController', ['$scope', 'customers', '$modalInstance', 'name',
    function($scope, customers, $modalInstance, name) {
      $scope.customers = customers;
      $scope.isDetail = true;
      $scope.name = name;

      $scope.close = function() {
        $modalInstance.dismiss('cancel');
      };

      $scope.goToPage = function(page, offset, limit) {
        customers.fetchOrders(offset, limit)
          .then(function() {
            $scope.refreshPagination(customers.orders.pagination.count);
          });
      };
    }
  ]
);