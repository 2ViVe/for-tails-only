'use strict';

angular.module('fto')
  .controller('ProductDetailCtr', ['$scope', 'product' , 'taxons', 'Shopping', '$modal',
    function($scope, product, taxons, Shopping, $modal) {

      $scope.personalizedTypes = product.data.personalizedTypes;
      $scope.personalizedValues = [];

      $scope.initPersonalizedValues = function(personalizedType, index) {
        $scope.personalizedValues[index] = {
          id: personalizedType.id,
          name: personalizedType.name
        };
      };

      $scope.product = product.data;

      $scope.allOptions = product.options;
      $scope.currentOptions = {};
      angular.forEach($scope.allOptions, function(options, optionType) {
        $scope.currentOptions[optionType] = options[0];
      });
      $scope.variant = product.getVariantByOptions($scope.currentOptions);

      $scope.changeOption = function(option, optionType) {
        $scope.currentOptions[optionType] = option;
        $scope.variant = product.getVariantByOptions($scope.currentOptions);
      };

      $scope.getOptionStyle = function(option) {
        if (option.presentationType === 'TXT' && option.presentationValue[0] === '#') {
          return {
            'background-color': option.presentationValue
          };
        }
        return null;
      };

      $scope.catalogCode = product.catalogCode;

      $scope.subTaxon = taxons.getSubTaxonById(product.data.taxonId);
      if ($scope.subTaxon !== null) {
        $scope.taxon = taxons.getById($scope.subTaxon.parentId);
      } else {
        $scope.taxon = taxons.getById(product.data.taxonId);
      }

      $scope.currentImage = product.data.images[0];

      $scope.changeImage = function(image) {
        $scope.currentImage = image;
      };

      $scope.thumbnailImage = function(image) {
        return image.replace('large', 'small');
      };

      $scope.addToCart = function() {
        Shopping.add($scope.variant, $scope.quantity, product.catalogCode, $scope.personalizedValues)
          .success(function() {
            $modal.open({
              templateUrl: 'views/shopping/shopping-modal.html',
              controller: 'ShoppingModalController',
              resolve: {
                shopping: ['Shopping', function(Shopping) {
                  return Shopping.fetch();
                }]
              }
            });
          });
      };

    }])
  .controller('ProductAccordion', ['$scope',
    function($scope) {
      $scope.oneAtATime = true;
      $scope.isopen1 = true;

      $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
      };
    }]);