'use strict';

angular.module('2ViVe')
  .factory('Organization', ['$http', 'Dashlize', 'CamelCaseLize',
    function($http, dashlize, camelCaselize) {
      return {
        fetch: function() {
          return $http.get('/api/v2/reports/organizations/unilevel', {
            transformResponse: camelCaselize,
            params : {
              'date' : 20140601
            }
          }).then(function(response) {
              console.log(response);
              return response.data.response;
            });
        }
      };
    }]);
