'use strict';

angular.module('2ViVe')
  .controller('CommissionReportController', ['$scope', 'commission', function($scope, commission) {
    $scope.commissionTypes = commission.type;

    commission.getDate().then(function(date){
      $scope.curpage = 1;
      $scope.selectType = $scope.commissionTypes[0];
      $scope.distributorId = null;
      $scope.dateArr = date;
      $scope.years = Object.keys(date);
      $scope.months = date[$scope.selectYear];
      $scope.selectYear = $scope.years[$scope.years.length - 1];
      $scope.selectMonth = date[$scope.selectYear][0];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      updateReport(true);
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    })
      .catch(function(){
        $scope.selectYear = null;
        $scope.selectMonth = null;
      });

    var updateReport = $scope.updateReport = function(reflash){
      if (reflash) {
        $scope.offset = 0;
        $scope.curpage = 1;
      }
      return commission.fetch($scope.date, $scope.selectType.code, $scope.offset)
        .then(function(result){
          $scope.names = result.data.names;
          $scope.values = result.data.values;
          $scope.count = result.meta.count;
          $scope.overview = result.overview;
        })
        .then(function(){
          if (reflash){
            $scope.refreshPagination($scope.count);
          }
        });
    };

    $scope.goToPage = function(page){
      $scope.curpage = page;
      $scope.offset = ($scope.curpage - 1) * 25 + 1;
      updateReport();
    };

    $scope.updateType = function(){
      console.log($scope.selectType);
      updateReport(true);
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateReport(true);
    };



  }]);