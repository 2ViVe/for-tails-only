'use strict';

angular.module('2ViVe')
  .factory('Handlers', ['$http', 'Dashlize', 'CamelCaseLize',
    function($http, dashlize, camelCaselize) {
      return {
        fetch: function(microchipId, firstName, lastName) {
          return $http.get('/api/v2/distributors', {
            transformResponse: camelCaselize,
            params : {
              'first-name' : firstName || '',
              'last-name' : lastName || '' ,
              'customer-id' : microchipId || ''
            }
          }).then(function(response) {
              return response.data.response;
            });
        }
      };
    }]);
