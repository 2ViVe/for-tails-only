'use strict';

angular.module('2ViVe')
  .factory('Organization', ['$http', 'Dashlize', 'CamelCaseLize',
    function($http, dashlize, camelCaselize) {
      return {
        fetch: function(date, isShowOrderList, distributorId) {
          if (distributorId) {
            return this.searchByDistributorId(date, isShowOrderList, distributorId);
          }
          var params = {};
          params.date = date;
          if (isShowOrderList){
            params.orders_only = 1;
          }
          return $http.get('/api/v2/reports/organizations/unilevel', {
            transformResponse: camelCaselize,
            params : params
          }).then(function(response) {
              return response.data.response;
            });
        },
        searchByDistributorId: function(date, isShowOrderList, distributorId){
          var params = {};
          params.date = date;
          if (isShowOrderList){
            params.orders_only = 1;
          }
          return $http.get('/api//v2/reports/organizations/unilevel/' + distributorId, {
            transformResponse: camelCaselize,
            params : params
          }).then(function(response){
              return response.data.response;
            });
        },
        getDate: function(){
          return $http.get('/api/v2/commissions/dates', {
            transformResponse: camelCaselize,
            params : {
              'periods' : 'monthly'
            }
          }).then(function(response){
              console.log(response.data.response.monthly);
              return response.data.response.monthly;
            });
        }
      };
    }]);
