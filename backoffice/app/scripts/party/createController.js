'use strict';

angular.module('fto/party')
  .controller('PartyCreateController', ['$scope', '$modal', 'country', 'Party', 'type', 'template',
    function($scope, $modal, country, Party, type, template) {
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

      $scope.save = function() {
        $scope.submitted = true;
        if ($scope.time.startDate && $scope.time.startTime) {
          $scope.data.startTime = $scope.time.startDate + 'T' + $scope.time.startTime + ':00.000Z';
        }
        if ($scope.time.startDate && $scope.time.startTime) {
          $scope.data.endTime = $scope.time.endDate + 'T' + $scope.time.endTime + ':00.000Z';
        }
        $scope.data.templateId = template.id;
        Party.create($scope.data)
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
