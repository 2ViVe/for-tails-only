'use strict';

angular.module('fto/signin')
  .controller('SignInController', ['$scope', 'UrlHandler', 'User', 'Shopping', 'LocalStorage',
    function($scope, UrlHandler, User, Shopping, LocalStorage) {
      var goToPreviousPath = function() {
        var pathAfterLogin = LocalStorage.getPathAfterLogin();
        LocalStorage.removePathAfterLogin();
        if (User.data.roleCode === 'D') {
          UrlHandler.goToBackOffice(pathAfterLogin);
        } else {
          UrlHandler.goToRetailSite(pathAfterLogin);
        }
      };

      $scope.isRemember = false;

      $scope.signIn = function() {
        $scope.isError = false;
        var isAlreadyLogin = User.isLogin;

        User.login($scope.username, $scope.password, $scope.isRemember)
          .success(function() {
            User.fetch().then(function() {
              if (!isAlreadyLogin && Shopping.items) {
                Shopping.mergeItems().success(goToPreviousPath);
              } else {
                Shopping.fetch().then(goToPreviousPath);
              }
            });
          })
          .error(function() {
            $scope.isError = true;
          });
      };
    }]);
