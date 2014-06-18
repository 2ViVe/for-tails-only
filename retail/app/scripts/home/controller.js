'use strict';

angular.module('fto')
  .controller('HomeController', ['$scope', 'Products' , 'Shopping', '$modal', 'featureProducts','newProducts',
    function($scope, Products, Shopping, $modal, featureProducts, newProducts) {
      var page,
        limitStart,
        limitEnd;

      $scope.featureProducts = featureProducts;
      $scope.newProducts = newProducts;
      $scope.FPPageNum = Math.ceil(featureProducts.products.length / 5);
      $scope.FPPage = page = 1;
      limitStart = ( page - 1 ) * 5;
      limitEnd = page * 5;
      $scope.featureProductsLimit = featureProducts.products.slice(limitStart, limitEnd);

      $scope.NPPageNum = Math.ceil(newProducts.products.length / 5);
      $scope.NPPage = page = 1;
      limitStart = ( page - 1 ) * 5;
      limitEnd = page * 5;
      $scope.newProductsLimit = newProducts.products.slice(limitStart, limitEnd);

      $scope.FPNext = function(page, pageNum){
        page += 1;
        if (page > pageNum) {
          page = 1;
        }
        $scope.FPPage = page;
        limitStart = ( page - 1 ) * 5;
        limitEnd = page * 5;
        $scope.featureProductsLimit = featureProducts.products.slice(limitStart, limitEnd);
      };

      $scope.FPPrev = function(page, pageNum){
        page -= 1;
        if (page <= 0) {
          page = pageNum;
        }
        $scope.FPPage = page;
        limitStart = ( page - 1 ) * 5;
        limitEnd = page * 5;
        $scope.featureProductsLimit = featureProducts.products.slice(limitStart, limitEnd);
      };

      $scope.NPNext = function(page, pageNum){
        page += 1;
        if (page > pageNum) {
          page = 1;
        }
        $scope.NPPage = page;
        limitStart = ( page - 1 ) * 5;
        limitEnd = page * 5;
        $scope.newProductsLimit = newProducts.products.slice(limitStart, limitEnd);
      };

      $scope.NPPrev = function(page, pageNum){
        page -= 1;
        if (page <= 0) {
          page = pageNum;
        }
        $scope.NPPage = page;
        limitStart = ( page - 1 ) * 5;
        limitEnd = page * 5;
        $scope.newProductsLimit = newProducts.products.slice(limitStart, limitEnd);
      };

    }]);