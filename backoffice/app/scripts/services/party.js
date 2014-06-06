'use strict';

angular.module('2ViVe')
  .factory('Party', ['$http', 'Dashlize', 'CamelCaseLize', 'User',
    function($http, dashlize, camelCaselize, User) {
      return {
        fetchTypes: function() {
          return $http.get('/api/v2/events/types', {
            transformResponse: camelCaselize
          }).then(function(response) {
            return response.data.response;
          });
        },
        create: function(event) {
          event.userId = User.data.userId;
          return $http.post('/api/v2/events', event, {
            transformResponse: camelCaselize,
            transformRequest: function(data) {
              return angular.toJson(dashlize(data));
            }
          });
        }
      };
    }]);