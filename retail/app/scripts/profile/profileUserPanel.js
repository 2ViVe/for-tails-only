'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profileInfoPanelCtrl', ['$scope', 'User', '$http', '$q', 'LocalStorage', '$location', '$document',
    function($scope, User, $http, $q, LocalStorage, $location, $document) {
      $scope.isEditing = false;
      $scope.isLoading = true;
      $scope.submitted = false;

      $scope.passwords = {
        newPassword: '',
        oldPassword: ''
      };

      User.fetch().then(function(result) {
        $scope.profile = result;
        $scope.isLoading = false;
        $scope.initProfile = angular.copy($scope.profile);
      }).catch(function() {
        LocalStorage.setPathAfterLogin($location.path());
        $location.path('/signin');
      });

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.restore = function() {
        angular.extend($scope.profile, $scope.initProfile);
      };

      $scope.changePassword = function(isValid) {
        $scope.submitted = true;
        if (!isValid) {
          return;
        }
        $scope
          .profile
          .updatePassword($scope.passwords).then(function() {
            $scope.isEditing = false;
            $scope.submitted = false;
            $scope.$errors = {};
          })
          .catch(respErrHandler);
      };


      // TODO: remove this when backend api fixed
      function checkEmailAvalibility(needCheck) {
        var deferred = $q.defer();

        if (needCheck) {
          $http.get('/api/v2/registrations/availabilities', {
            params: { email: $scope.profile.email }
          }).success(function(data) {
            (data.response.available ? deferred.resolve : deferred.reject)({
              data: {
                meta: {
                  error: {
                    errorCode: 'InvalidEmail',
                    message: 'Email is not available.'
                  }
                }
              }
            });
          });
        }
        else {
          $scope.$evalAsync(function() { deferred.resolve(true); });
        }

        return deferred.promise;
      }

      function respErrHandler(resp) {
        $scope.isLoading = false;
        $scope.isEditing = true;
        if (!resp.data.meta || !resp.data.meta.error) { return ; }
        var error = resp.data.meta.error;
        $scope.$errors = {};
        $scope.$errors[error.errorCode] = error.message;
      }

      $scope.save = function() {
        $scope.submitted = true;
        $scope.isLoading = true;
        checkEmailAvalibility($scope.profile.email !== $scope.initProfile.email)
          .then(function() {
            $scope.initProfile.email = $scope.profile.email;
            return $scope.profile.save();
          })
          .then(function() {
            $scope.isLoading = false;
            $scope.isEditing = false;
          })
          .catch(respErrHandler);
      };

      //upload avatar
      $scope.getFile = function(){
        $document[0].getElementById('file').click();
      };

    }])
    .directive('profileInfoPanel', function() {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: '/views/profile/profile-info-panel.html',
        controller: 'profileInfoPanelCtrl',
        scope: {},
        link: function() {
          
        }
      };
    })
    .directive('fileread', ['Avatar', function(Avatar) {
      return {
        restrict: 'A',
        scope: {
          fileread: '='
        },
        link: function (scope, element) {
          element.bind('change', function (changeEvent) {
            scope.$apply(function () {
              var fileread = changeEvent.target.files;
              if(fileread.length === 0){
                return;
              }
              Avatar.upload(fileread[0]).then(function(result){
                console.log(result);
                //reflash avator

              });
            });
          });
        }
      };
    }]);

})();

