'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerListController', ['$scope', 'customers', '$modal',
    function($scope, customers, $modal) {
      $scope.customers = customers;

      $scope.showOrder = function(customer) {
        $modal.open({
          templateUrl: 'views/customer/order.html',
          controller: 'CustomerDetailController',
          resolve: {
            customers: function() {
              return customers.fetchOrders(undefined, undefined, customer.distributorId);
            },
            customer: function() {
              return customer;
            }
          }
        });
      };

      $scope.goToPage = function(page, offset, limit) {
        customers.fetch(offset, limit);
      };
    }
  ]
);