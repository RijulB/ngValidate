'use strict';
window.angular.module('demoModule', ['ngValidateModule'])
.run(function(ngValidateFactory){
        ngValidateFactory.strategies.exampleStrategy1 = [
            {
                value:ngValidateFactory.required,
                message:'This Field is required'
            },
            {
                value:[ngValidateFactory.minLength,8],
                message:'Minimum 8 characters required'
            },
            {
                value:[ngValidateFactory.maxLength,32],
                message:'Maximum 32 characters allowed'
            },
            {
                value: ngValidateFactory.emailPattern,
                message: 'Not a valid email'
            }
        ];

        ngValidateFactory.strategies.exampleStrategy2 = [
            {
                value:ngValidateFactory.required,
                message:'This Field is required'
            },
            {
                value:[ngValidateFactory.maxLength,32],
                message:'Maximum 32 characters allowed'
            }
        ];

        ngValidateFactory.strategies.exampleStrategy3 = [
            {
                value:[ngValidateFactory.minLength,8],
                message:'Minimum 8 characters required'
            },
            {
                value:[ngValidateFactory.maxLength,32],
                message:'Maximum 32 characters allowed'
            }
        ];
    })
.controller('DemoCtrl',
  function($scope) {
      $scope.user = {};
  }
);
