'use strict';

angular.module('fto/party')
  .controller('PartyEditController', ['$scope', '$modal', 'country', 'Event', 'type', 'templates', '$location', 'event',
    function($scope, $modal, country, Event, type, templates, $location, event) {
      $scope.templates = templates;
      $scope.country = country;
      $scope.error = '';
      $scope.submitted = false;
      $scope.data = event.data;
      $scope.time = {};
      var startTime = moment(event.data.startTime);
      if (startTime.isValid()) {
        $scope.time.startDate = startTime.format('YYYY-MM-DD');
        $scope.time.startTime = startTime.format('HH:mm');
      }
      var endTime = moment(event.data.endTime);
      if (endTime.isValid()) {
        $scope.time.endDate = endTime.format('YYYY-MM-DD');
        $scope.time.endTime = endTime.format('HH:mm');
      }

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
        if ($scope.time.startDate && $scope.time.startTime) {
          $scope.data.startTime = $scope.time.startDate + 'T' + $scope.time.startTime + ':00.000Z';
        }
        if ($scope.time.startDate && $scope.time.startTime) {
          $scope.data.endTime = $scope.time.endDate + 'T' + $scope.time.endTime + ':00.000Z';
        }
        $scope.data.templateId = templates[selectedTemplateIndex].id;
        event.edit($scope.data)
          .then(function(event) {
            $location.path('/party/' + event.data.id);
          })
          .catch(function(response) {
            $scope.error = response.data.meta.error.message;
          });
      };

      $scope.partyCreateContact = function() {
        $modal.open({
          templateUrl: 'views/party/party-create-contact.html',
          controller: 'ModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);
