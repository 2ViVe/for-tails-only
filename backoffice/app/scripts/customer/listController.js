'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerListController', ['$scope', 'customers',
    function($scope, customers) {
      $scope.customers = customers;

      $scope.contactInformation = function(customer) {
        return 'Zip Code: ' + customer.zipCode + '<br>' +
          'Address: ' + customer.address + '<br>' +
          'Phone: ' + customer.phone + '<br>' +
          'Email: ' + customer.email + '<br>';
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