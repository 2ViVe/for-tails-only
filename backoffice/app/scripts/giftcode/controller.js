'use strict';

angular.module('2ViVe')
  .controller('giftCodeCtrl', ['$scope','giftCode' , 'GiftCards', function($scope, giftCode, GiftCards) {
    $scope.giftcodes = giftCode;

    $scope.sendEmail = function(giftcard){
      var code = giftcard.code;
      GiftCards.resendEmail(code).then(function(data){
        $scope.isSuccess = data.response.success;
        $scope.reciEmail = data.response.recipientEmail;
      });
    };
  }]);
