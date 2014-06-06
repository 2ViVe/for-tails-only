'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profileAddressPanelCtrl', ['$scope', 'Address', 'Registration', function($scope, Address, Registration) {

      $scope.isEditing = false;
      $scope.isLoading = true;

      Address.fetch().then(function(addr) {
        $scope.address = addr[$scope.addressType.toLowerCase()];
        $scope.initAddress = angular.copy($scope.address);
      });

      Registration.countries().then(function(result) {
        $scope.countries = result;
      });

      $scope.restore = function() {
        return angular.extend($scope.address, $scope.initAddress);
      };

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.save = function(isValid) {
        if (!isValid) {
          return;
        }
        $scope.address.update()
          .then(function() {
            $scope.isEditing = false;
            $scope.initAddress = angular.copy($scope.address);
          })
          .catch(function() {
            $scope.isEditing = true;
          });
      };

    }])
    .directive('profileAddressPanel', function() {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: '/views/profile/profile-address-panel.html',
        controller: 'profileAddressPanelCtrl',
        scope: {
          addressType: '@',
          addressTitle: '@'
        },
        link: function() {
        }
      };
    });

})();