'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'taxons',
    function($scope, Products, $routeParams, taxons) {
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      $scope.taxons = taxons.getByPositionBetween(0, 1000);
      var taxon = taxons.getByPermalink(taxonPermalink);
      $scope.currentTaxon = taxon;

      if (subTaxonPermalink) {
        $scope.currentTaxon = taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, taxon);
      }

      Products.getByTaxon($scope.currentTaxon.id)
        .then(function(data) {
          $scope.products = data.products;
        });
    }])
  .controller('RenewalController', ['$scope', 'products', 'Shopping', '$modal',
    function($scope, products, Shopping, $modal) {
      $scope.products = products.products;
      $scope.addToCart = function(product) {
        Shopping.empty().success(function() {
          Shopping.add(product.variants[0], 1, 'RW')
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
        });
      };
    }]);