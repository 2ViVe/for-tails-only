'use strict';

angular
  .module('fto/signup')
  .controller('AddressPanelCtrl', ['$scope', 'Registration.Countries', function($scope, Countries) {

    if ($scope.addressType !== 'website') {
      Countries
        .fetch()
        .then(function(countries) {
          $scope.countries = countries.data;
          $scope.address.country = Countries.defaultCountry();
        });
    }

    $scope.isUseHomeAddress = $scope.defaultUseHomeAddress ? true : false;

    $scope.isUseHomeAddressChange = function(isUseHomeAddress) {
      if (isUseHomeAddress) {
        $scope.address.extendDataFrom($scope.homeAddress);
      } else {
        $scope.address.cleanData();
      }
    };
  }]);