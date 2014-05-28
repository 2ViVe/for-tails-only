angular
  .module('fto/signup')
  .controller('QuickSignupCtrl', ['$scope', '$http', 'Dashlize', 'CamelCaseLize', 'signupResult', '$location', 'Address',function($scope, $http, dashlize, camelize, result, $location, Address) {
    $scope.$errors = {};

    $scope.account = {

    };

    $scope.address = {
      home: {},
      shipping: {}
    };

    $scope.address = new Address.AddressContainer();

    $scope.address
      .addType('home')
      .addType('shipping');


    $scope.create = function() {
      $scope.isProcessing = true;

      var account = {};

      account.homeAddress = $scope.address.home;
      account.shippingAddress = $scope.address.shipping;

      angular.forEach($scope.$errors, function(val, key) {
        delete $scope.$errors[key];
      });

      $http
        .post('/api/v2/registrations/distributors-without-order', account, {
          transformRequest: function(data) { return angular.toJson(dashlize(data)); },
          transformResponse: camelize
        })
        .then(function(resp) {
          $scope.isProcessing = false;
          result.set(resp.data.response);
          $location.path('/quick-signup/success');
        })
        .catch(function(resp) {
          if (resp.status === 400) {
            var error = resp.data.meta.error;
            $scope.$errors[error.errorCode] = error.message;
          }
          $scope.isProcessing = false;
        });

    };
  }]);
