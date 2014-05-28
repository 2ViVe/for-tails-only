'use strict';

angular.module('2ViVe')
  .directive('signUpStep1', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', 'Registration', function($scope, Registration) {
        function updateProducts(country) {
          Registration.getProducts(country.id)
            .success(function(data) {
              var products = data.response.products;
              angular.forEach(products, function(product) {
                if (product['variant-id']) {
                  product.quantity = 1;
                }
              });
              $scope.products = products;
            });
        }

        $scope.nextStep = function() {
          $scope.submitted = true;
          if (this.step1.$valid) {
            $scope.goToNextStep();
          }
        };

        updateProducts($scope.account.country);

        $scope.registrationCountryChange = function(country) {
          updateProducts(country);
        };
      }],
      link: function(scope, element) {
        var isViewedTermAndCondition = false;
        var isAgreementChecked = false;
        var $element = angular.element(element);

        $element.find('#term-condition').on('scroll', function() {
          if (!isViewedTermAndCondition) {
            isViewedTermAndCondition = (this.scrollTop + this.offsetHeight) > this.scrollHeight;
          }
          if (isViewedTermAndCondition) {
            $element.find('#is-agreed').removeAttr('disabled');
          }
        });
        $element.find('#is-agreed').on('change', function() {
          isAgreementChecked = angular.element(this).is(':checked');
          if (isViewedTermAndCondition && isAgreementChecked) {
            $element.find('button').removeAttr('disabled');
          } else {
            $element.find('button').attr('disabled', 'disabled');
          }
        });
      }
    };
  }]);