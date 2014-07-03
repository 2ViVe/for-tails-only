'use strict';

angular.module('fto/header', ['2ViVe'])
  .controller('HeaderController', ['$scope', 'User', '$window', 'Shopping', 'UrlHandler', 'LocalStorage', '$location',
    function($scope, User, $window, Shopping, UrlHandler, LocalStorage, $location) {
      $scope.user = User;
      $scope.shopping = Shopping;
      $scope.backOfficeUrl = UrlHandler.backOfficeUrl();
      $scope.replicateOwner = LocalStorage.getReplicateOwner();

      $scope.logout = function() {
        User.logout().success(function() {
          $window.location.href = '/';
        });
      };

      $scope.search = function() {
        $location.path('/search/' + $scope.productName);
      };
    }]);
