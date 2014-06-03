'use strict';

angular.module('fto')
  .controller('ProductDetailCtr', ['$scope', 'product' , 'taxons', 'Shopping',
    function($scope, product, taxons, Shopping) {

      var updateVariant = function() {
        $scope.variant = product.getVariantByOptions({
          'Color': $scope.selectedColor,
          'Size': $scope.selectedSize,
          'Gender': $scope.selectedGender
        });
      };

      console.log(product.data.personalizedTypes);

      $scope.personalizedTypes = product.data.personalizedTypes;
      $scope.product = product.data;
      $scope.colors = product.Color;
      $scope.genders = product.Gender;
      $scope.sizes = product.Size;
      $scope.selectedColor = product.Color ? product.Color[0] : null;
      $scope.selectedSize = product.Size ? product.Size[0] : null;
      $scope.selectedGender = product.Gender ? product.Gender[0] : null;
      $scope.currentImage = product.data.images[0];
      $scope.catalogCode = product.catalogCode;

      updateVariant();

      $scope.subTaxon = taxons.getSubTaxonById(product.data.taxonId);
      if ($scope.subTaxon !== null) {
        $scope.taxon = taxons.getById($scope.subTaxon.parentId);
      } else {
        $scope.taxon = taxons.getById(product.data.taxonId);
      }

      $scope.changeColor = function(color) {
        $scope.selectedColor = color;
        updateVariant();
      };

      $scope.changeGender = function(gender) {
        $scope.selectedGender = gender;
        updateVariant();
      };

      $scope.changeSize = function(size) {
        $scope.selectedSize = size;
        updateVariant();
      };

      $scope.changeImage = function(image) {
        $scope.currentImage = image;
      };

      $scope.thumbnailImage = function(image) {
        return image.replace('large', 'small');
      };

      $scope.addToCart = function() {
        Shopping.add($scope.variant, $scope.quantity, product.catalogCode);
//          .success(function() {
//            $modal.open({
//              templateUrl: 'views/shopping/shopping-modal.html',
//              controller: 'ShoppingModalController',
//              resolve: {
//                shopping: ['Shopping', function(Shopping) {
//                  return Shopping.fetch();
//                }]
//              }
//            });
//          });
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

      
