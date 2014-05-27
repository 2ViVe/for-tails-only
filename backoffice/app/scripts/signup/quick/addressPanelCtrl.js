'use strict';

angular
  .module('fto/signup')
  .controller('AddressPanelCtrl', ['$scope', 'Registration.Countries', function($scope, Countries) {

    Countries
      .fetch()
      .then(function(countries) {
        $scope.countries = countries.data;
        $scope.address.country = Countries.defaultCountry();
      });

    $scope.useHomeAddress = function() {
      angular.extend($scope.address, $scope.homeAddress);
    };
  }]);