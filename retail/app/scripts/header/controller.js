'use strict';

angular.module('fto/header', ['2ViVe'])
  .controller('HeaderController', ['$scope', 'User', '$window', 'Shopping', 'UrlHandler', 'LocalStorage', '$location',
    function($scope, User, $window, Shopping, UrlHandler, LocalStorage, $location) {
      $scope.user = User;
      $scope.shopping = Shopping;
      $scope.backOfficeUrl = UrlHandler.backOfficeUrl();
      $scope.$watch(function() {
        return LocalStorage.getReplicateOwner();
      }, function(replicateOwner) {
        $scope.replicateOwner = replicateOwner;
      });

      $scope.logout = function() {
        User.logout().success(function() {
          $window.location.href = '/';
        });
      };

      $scope.search = function() {
        var productName = $scope.productName;
        if (productName.length > 2) {
          $location.path('/search/' + productName);
        }
      };
    }]);
