'use strict';

angular.module('2ViVe')
  .directive('equalTo',
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          ctrl.$setValidity('equalTo', element.val() === angular.element(attrs.equalTo).val());
          return viewValue;
        });
      }
    };
  })
  .directive('availabilitiesValidator', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          key: '@availabilitiesValidator'
        },
        link: function(scope, element, attrs, ctrl) {
          angular.element(element).on('blur', function() {
            var value = ctrl.$modelValue;
            if (ctrl.$isEmpty(value)) {
              return;
            }
            Registration.validateAvailabilities(scope.key, value)
              .success(function() {
                ctrl.$setValidity('validated', true);
              })
              .error(function() {
                ctrl.$setValidity('validated', false);
              });
          });
        }
      };
    }])
  .directive('sponsorValidator', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          angular.element(element).on('blur', function() {
            var sponsorId = ctrl.$modelValue;
            if (ctrl.$isEmpty(sponsorId)) {
              return;
            }
            Registration.validateSponsor(sponsorId)
              .success(function() {
                ctrl.$setValidity('validated', true);
              })
              .error(function() {
                ctrl.$setValidity('validated', false);
              });
          });
        }
      };
    }])
  .directive('homeAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/home-address.html',
        scope: {
          homeAddress: '=',
          submitted: '=',
          form: '=',
          isHomeAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.homeAddress === undefined) {
            $scope.homeAddress = {};
          }
          $scope.$on('remoteValidate', function() {
            Address.validateHomeAddress($scope.homeAddress)
              .success(function(data) {
                var failures = data.response.failures;
                if (failures) {
                  angular.forEach(failures, function(failiure) {
                    $scope.form['home-' + failiure.field].$setValidity('validated', false);
                    $scope.form['home-' + failiure.field].errorMessageValidated = failiure.message;
                  });
                  $scope.isHomeAddressValidated = false;
                } else {
                  $scope.isHomeAddressValidated = true;
                }
              })
              .error(function() {
                $scope.isHomeAddressValidated = false;
              });
          });
        }]
      };
    }])
  .directive('webAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/web-address.html',
        scope: {
          homeAddressSource: '=',
          webAddress: '=',
          submitted: '=',
          form: '=',
          isWebAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.webAddress === undefined) {
            $scope.webAddress = {
              'first-name': '',
              'last-name': '',
              phone: '',
              'mobile-phone': '',
              email: '',
              'fax-number': ''
            };
          }
          $scope.$on('remoteValidate', function() {
            Address.validateWebAddress($scope.webAddress)
              .success(function(data) {
                var failures = data.response.failures;
                if (failures) {
                  angular.forEach(failures, function(failiure) {
                    $scope.form['web-' + failiure.field].$setValidity('validated', false);
                    $scope.form['web-' + failiure.field].errorMessageValidated = failiure.message;
                  });
                  $scope.isWebAddressValidated = false;
                } else {
                  $scope.isWebAddressValidated = true;
                }
              })
              .error(function() {
                $scope.isWebAddressValidated = false;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.webIsUseHomeAddress) {
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.webAddress[key] !== undefined) {
                  $scope.webAddress[key] = value;
                }
              });
            } else {
              angular.forEach($scope.webAddress, function(value, key) {
                $scope.webAddress[key] = '';
              });
            }
          };
        }]
      };
    }])
  .directive('shipmentAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/shipment-address.html',
        scope: {
          homeAddressSource: '=',
          shipmentAddress: '=',
          submitted: '=',
          form: '=',
          isShipmentAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.shipmentAddress === undefined) {
            $scope.shipmentAddress = {
              'first-name': '',
              'last-name': '',
              street: '',
              'street-contd': '',
              'country-id': '',
              'state-id': '',
              city: '',
              zip: '',
              phone: ''
            };
          }
          $scope.$on('remoteValidate', function() {
            Address.validateShippingAddress($scope.shippingAddress)
              .success(function(data) {
                var failures = data.response.failures;
                if (failures) {
                  angular.forEach(failures, function(failiure) {
                    $scope.form['shipping-' + failiure.field].$setValidity('validated', false);
                    $scope.form['shipping-' + failiure.field].errorMessageValidated = failiure.message;
                  });
                  $scope.isShippingAddressValidated = false;
                } else {
                  $scope.isShippingAddressValidated = true;
                }
              })
              .error(function() {
                $scope.isShippingAddressValidated = false;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.shipmentIsUseHomeAddress) {
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.shipmentAddress[key] !== undefined) {
                  $scope.shipmentAddress[key] = value;
                }
              });
              console.log($scope.shipmentAddress);
            } else {
              angular.forEach($scope.shipmentAddress, function(value, key) {
                $scope.shipmentAddress[key] = '';
              });
            }
          };
        }]
      };
    }])
  .directive('billingAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/billing-address.html',
        scope: {
          homeAddressSource: '=',
          billingAddress: '=',
          submitted: '=',
          form: '=',
          isBillingAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.billingAddress === undefined) {
            $scope.billingAddress = {
              'first-name': '',
              'last-name': '',
              street: '',
              'street-contd': '',
              'country-id': '',
              'state-id': '',
              city: '',
              zip: '',
              phone: ''
            };
          }
          $scope.$on('remoteValidate', function() {
            Address.validateBillingAddress($scope.billingAddress)
              .success(function() {
                $scope.isbillingAddressValidated = true;
              })
              .error(function() {
                $scope.isbillingAddressValidated = false;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.billingIsUseHomeAddress) {
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.billingAddress[key] !== undefined) {
                  $scope.billingAddress[key] = value;
                }
              });
            } else {
              angular.forEach($scope.billingAddress, function(value, key) {
                $scope.billingAddress[key] = '';
              });
            }
          };
        }]
      };
    }]);