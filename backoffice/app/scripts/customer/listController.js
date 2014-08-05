'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerListController', ['$scope', 'customers', '$modal',
    function($scope, customers, $modal) {
      $scope.customers = customers;

      $scope.contactInformation = function(customer) {
        return 'Zip Code: ' + customer.zipCode + '<br>' +
          'Address: ' + customer.address + '<br>' +
          'Phone: ' + customer.phone + '<br>' +
          'Email: ' + customer.email + '<br>';
      };

      $scope.showOrder = function(customer) {
        $modal.open({
          templateUrl: 'views/customer/order.html',
          controller: 'CustomerDetailController',
          resolve: {
            customers: function() {
              return customers.fetchOrders(undefined, undefined, customer.distributorId);
            },
            name: function() {
              return customer.firstName + ' ' + customer.lastName;
            }
          }
        });
      };

      $scope.goToPage = function(page, offset, limit) {
        customers.fetch(offset, limit)
          .then(function() {
            $scope.refreshPagination(customers.orders.pagination.count);
          });
      };
    }
  ]
);