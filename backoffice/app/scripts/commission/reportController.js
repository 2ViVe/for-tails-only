'use strict';

angular.module('2ViVe')
  .controller('CommissionReportController', ['$scope', 'commission', function($scope, commission) {
    $scope.commissionTypes = commission.type;

    commission.getDate().then(function(date){
      $scope.offset = 0;
      $scope.limit = 25;
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

    $scope.goToPage = function(offset, limit){
      $scope.offset = offset;
      $scope.limit = limit;
      updateReport();
    };

    $scope.updateType = function(){
      updateReport(true);
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateReport(true);
    };



  }]);