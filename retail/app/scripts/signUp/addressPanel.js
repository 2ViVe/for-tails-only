'use strict';

angular
  .module('fto/signup')
  .directive('addressPanel', [function() {
    return {
      replace: true,
      templateUrl: function(elm, attr) {
        var type = attr.addressType;
        var filename = 'address-panel.html';

        if (type === 'web') {
          filename = 'web-' + filename;
        }
        return 'views/sign-up/components/' + filename;
      },
      controller: 'AddressPanelCtrl',
      controllerAs: 'panel',
      scope: {
        title: '@',
        address: '=',
        addressType: '@',
        homeAddress: '='
      }
    };
  }]);
