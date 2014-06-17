'use strict';

angular.module('fto/party')
  .controller('PartyCreateController', ['$scope', '$modal', 'country', 'Event', 'type', 'templates', '$location',
    function($scope, $modal, country, Event, type, templates, $location) {
      $scope.templates = templates;
      $scope.country = country;
      $scope.error = '';
      $scope.submitted = false;
      $scope.time = {};
      $scope.data = {
        address: {
          countryIso: country.iso,
          countryName: country.name
        },
        typeId: type.id
      };
      $scope.times = [];
      for (var hour = 0; hour < 24; hour++) {
        if (hour < 10) {
          $scope.times.push('0' + hour + ':00');
        } else {
          $scope.times.push(hour + ':00');
        }
      }

      var selectedTemplateIndex = 0;

      $scope.nextTemplate = function() {
        if (selectedTemplateIndex === templates.length - 1) {
          selectedTemplateIndex = 0;
        } else {
          selectedTemplateIndex++;
        }
      };

      $scope.previousTemplate = function() {
        if (selectedTemplateIndex === 0) {
          selectedTemplateIndex = templates.length - 1;
        } else {
          selectedTemplateIndex--;
        }
      };

      $scope.save = function() {
        $scope.submitted = true;
        $scope.data.templateId = templates[selectedTemplateIndex].id;
        var event = new Event();
        event.create($scope.data, $scope.time)
          .then(function(event) {
            $location.path('/party/' + event.data.id + '/invite');
          })
          .catch(function(response) {
            $scope.error = response.data.meta.error.message;
          });
      };
    }]);
