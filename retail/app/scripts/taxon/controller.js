'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'taxons',
    function($scope, Products, $routeParams, taxons) {
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      var taxon = taxons.getByPermalink(taxonPermalink);
      $scope.taxon = taxon;
      $scope.currentTaxon = taxon;

      if (subTaxonPermalink) {
        $scope.currentTaxon = taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, taxon);
      }

      Products.getByTaxon($scope.currentTaxon.id)
        .then(function(data) {
          $scope.products = data.products;
        });
    }]);