'use strict';

angular.module('2ViVe')
  .controller('OrganizationController', ['$scope', 'Organization', 'date', function($scope, Organization, date) {

    var updateOrder = $scope.updateOrder = function(reflash){
      Organization.fetch($scope.date, $scope.isShowOrderList, $scope.distributorId, $scope.offset)
        .then(function(orders){
          $scope.orders = orders;
        })
        .then(function(){
          Organization.getCount($scope.date, $scope.isShowOrderList)
            .then(function(count){
              $scope.count = count;
            })
            .then(function(){
              if (reflash){
                $scope.curpage = 1;
                $scope.refreshPagination($scope.count);
              }
            });
        });
    };

    $scope.goToPage = function(page){
      $scope.curpage = page;
      $scope.offset = ($scope.curpage - 1) * 25 + 1;
      updateOrder();
    };

    $scope.curpage = 1;
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
      $scope.selectMonth = date[$scope.selectYear][0];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      updateOrder(true);
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    } catch (error) {
      $scope.selectYear = null;
      $scope.selectMonth = null;
    }

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateOrder(true);
    };

    $scope.changeDistributorId = function(id){
      $scope.distributorId = id;
      updateOrder(true);
    };

  }]);