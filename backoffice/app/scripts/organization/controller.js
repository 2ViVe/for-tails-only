'use strict';

angular.module('2ViVe')
  .controller('OrganizationController', ['$scope', 'Organization', 'date', function($scope, Organization, date) {
    var updateOrder = $scope.updateOrder = function(){
      Organization.fetch($scope.date, $scope.isShowOrderList, $scope.distributorId, $scope.curpage)
        .then(function(orders){
          $scope.orders = orders;
        });

      Organization.getCount($scope.date, $scope.isShowOrderList)
        .then(function(count){
          $scope.count = count;
        });
    };

    $scope.goToPage = function(page){
      $scope.curpage = page;
      updateOrder();
      $scope.refreshPagination($scope.count);
    };

    $scope.isShowOrderList = false;
    $scope.distributorId = null;
    $scope.orders = [];

    $scope.years = Object.keys(date);
    $scope.months = date[$scope.selectYear];

    $scope.getMonth = function(){
      $scope.months = date[$scope.selectYear];
    };

    try {
      $scope.selectYear = $scope.years[$scope.years.length - 1];
      $scope.selectMonth = date[$scope.selectYear][date[$scope.selectYear].length - 1];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      updateOrder();
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    } catch (error) {
      $scope.selectYear = null;
      $scope.selectMonth = null;
    }

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateOrder();
    };

    $scope.changeDistributorId = function(id){
      $scope.distributorId = id;
      updateOrder();
    };

  }]);