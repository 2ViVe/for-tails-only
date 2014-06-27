'use strict';

angular.module('2ViVe')
  .controller('OrganizationController', ['$scope', 'Organization', 'date', function($scope, Organization, date) {
    var updateOrder = $scope.updateOrder = function(){
      Organization.fetch($scope.date, $scope.isShowOrderList, $scope.distributorId).then(function(orders){
        $scope.orders = orders;
        console.log(orders);
      });
    }

    $scope.isShowOrderList = false;
    $scope.distributorId = null;
    $scope.orders = [];

    $scope.years = Object.keys(date);
    $scope.months = date[$scope.selectYear];

    $scope.getMonth = function(){
      $scope.months = date[$scope.selectYear];
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateOrder();
    };

    $scope.changeDistributorId = function(id){
      $scope.distributorId = id;
      updateOrder();
    };

  }]);