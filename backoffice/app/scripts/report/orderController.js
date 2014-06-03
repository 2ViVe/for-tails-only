'use strict';

angular.module('fto/report')
  .controller('OrderReportController', ['$scope', 'orders', '$modal',
    function($scope, orders, $modal) {
      $scope.orders = orders;

      $scope.viewDetail = function(id) {
        $modal.open({
          templateUrl: 'views/report/order-detail.html',
          controller: 'OrderReportDetailController',
          resolve: {
            'order': ['Order', function(Order) {
              return Order.detail(id);
            }]
          }
        });
      };
    }])
  .controller('OrderReportDetailController', ['$scope', 'order', '$modalInstance',
    function($scope, order, $modalInstance) {
      $scope.order = order;

      angular.forEach(order.availableShippingMethods, function(shippingMethod) {
        if (shippingMethod.id === order.shippingMethodId) {
          $scope.shippingMethod = shippingMethod;
          return null;
        }
      });

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);
