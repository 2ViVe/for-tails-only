'use strict';

angular.module('2ViVe')
  .factory('Organization', ['$http', 'Dashlize', 'CamelCaseLize',
    function($http, dashlize, camelCaselize) {
      return {
        fetch: function(date, isShowOrderList, distributorId, page) {
          if (distributorId) {
            return this.searchByDistributorId(date, isShowOrderList, distributorId, page);
          }

          var params = {};
          params.date = date;

          if (isShowOrderList){
            params.orders_only = 1;
          }

          if (page){
            params.offset = page;
          }

          return $http.get('/api/v2/reports/organizations/unilevel', {
            transformResponse: camelCaselize,
            params : params
          }).then(function(response) {
              return response.data.response;
            });
        },

        getCount : function(date, isShowOrderList){
          var params = {};
          params.date = date;

          if (isShowOrderList){
            params.orders_only = 1;
          }

          return $http.get('/api/v2/reports/organizations/counts/unilevel', {
            transformResponse: camelCaselize,
            params : params
          }).then(function(response) {
              return response.data.response.count;
            });
        },

        searchByDistributorId: function(date, isShowOrderList, distributorId, page){
          var params = {};
          params.date = date;

          if (isShowOrderList){
            params.orders_only = 1;
          }

          if (page){
            params.offset = page;
          }

          return $http.get('/api/v2/reports/organizations/unilevel/' + distributorId, {
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
              return response.data.response.monthly;
            });
        }
      };
    }]);
