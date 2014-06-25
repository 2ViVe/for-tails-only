'use strict';

angular.module('2ViVe')
  .factory('Genealogy', ['$http', 'CamelCaseLize',
    function($http, camelCaseLize) {
      var Genealogy = function() {
      };

      Genealogy.prototype.fetchPath = function(distributorId) {
        var genealogy = this;
        return $http.get('/api/v2/genealogy/unilevel/path', {
          transformResponse: camelCaseLize,
          params: {
            'from': distributorId
          }
        }).then(function(response) {
          var path = response.data.response.path;
          genealogy.path = path && path.length > 0 ? path.split('-') : undefined;
          return genealogy;
        });
      };

      Genealogy.prototype.fetchUniLevels = function(distributorId) {
        var genealogy = this;
        return $http.get('/api/v2/genealogy/unilevel', {
          transformResponse: camelCaseLize,
          params: {
            'distributor-id': distributorId
          }
        }).then(function(response) {
          genealogy.data = response.data.response;
          return genealogy;
        });
      };

      return Genealogy;
    }
  ]);