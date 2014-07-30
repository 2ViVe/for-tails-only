'use strict';

angular.module('2ViVe')
  .controller('OrganizationController', ['$scope', 'organization', function($scope, organization) {
    organization.getDate().then(function(date){
      $scope.offset = 0;
      $scope.isShowOrderList = false;
      $scope.distributorId = null;
      $scope.orders = [];
      $scope.dateArr = date;
      $scope.years = Object.keys(date);
      $scope.months = date[$scope.selectYear];
      $scope.selectYear = $scope.years[$scope.years.length - 1];
      $scope.selectMonth = date[$scope.selectYear][0];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      updateOrder(true);
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    })
      .catch(function(){
        $scope.selectYear = null;
        $scope.selectMonth = null;
      });

    var updateOrder = $scope.updateOrder = function(reflash){
      return organization.fetch($scope.date, $scope.isShowOrderList, $scope.distributorId, $scope.offset, $scope.limit)
        .then(function(result){
          $scope.orders = result.rows;
          if($scope.distributorId){
            $scope.count = 1;
          } else {
            $scope.count = result.meta.count;
          }
        })
        .then(function(){
          if (reflash){
            $scope.refreshPagination($scope.count);
          }
        });
    };

    $scope.goToPage = function(offset, limit){
      $scope.offset = offset;
      $scope.limit = limit;
      updateOrder();
    };

    $scope.getMonth = function(){
      $scope.months = $scope.dateArr[$scope.selectYear];
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateOrder(true);
    };

    $scope.parseFloat = function(value){
      return parseFloat(value);
    };

    $scope.clearDistributorId = function(){
      $scope.distributorId = null;
      updateOrder(true);
    };
  }]);