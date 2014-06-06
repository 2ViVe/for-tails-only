'use strict';

angular.module('fto')
  //for party view invitation page
  .controller('PickdayController', ['$scope',
    function($scope) {
      $scope.picker = new Pikaday(
        {
          field: document.getElementById('party-calendar-field'),
          firstDay: 1,
          minDate: new Date('2000-01-01'),
          maxDate: new Date('2020-12-31'),
          yearRange: [2000, 2020],
          bound: false,
          container: document.getElementById('party-calendar')
        });
    }]);