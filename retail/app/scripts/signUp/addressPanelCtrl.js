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

    $scope.useHomeAddress = function() {
      $scope.address.firstName = $scope.homeAddress.firstName;
      $scope.address.m = $scope.homeAddress.m;
      $scope.address.lastName = $scope.homeAddress.lastName;
      $scope.address.phone = $scope.homeAddress.phone;

      if ($scope.addressType !== 'website') {
        $scope.address.street = $scope.homeAddress.street;
        $scope.address.streetCont = $scope.homeAddress.streetCont;
        $scope.address.city = $scope.homeAddress.city;
        $scope.address.state = $scope.homeAddress.state;
        $scope.address.country = $scope.homeAddress.country;
        $scope.address.zip = $scope.homeAddress.zip;
        $scope.address.phone = $scope.homeAddress.phone;
      }
    };
  }]);