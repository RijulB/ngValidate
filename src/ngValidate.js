/**
 * Created by acr on 4/14/2015.
 */
var module = angular.module('ngValidateModule',[]);

module
    .directive('ngValidate', function ($log,$compile,ngValidateFactory) {

        var validationFunction = function (scope, element, attrs, ctrl) {

            var strategy = attrs.ngValidate;
            var validationCase = ngValidateFactory.strategies[strategy];

            $log.info('validating element:');
            $log.info(element);
            $log.info("with strategy: " + strategy);

            if(!validationCase || !angular.isArray(validationCase) || validationCase.length==0){
                $log.info("Invalid validation case. Validating as true.");
                ctrl.$setValidity("emptyValidation",true);
                return;
            }

            //Validate as invisible elements as Valid
            //check controller visibility-Jquery style (visible if width>0 & height>0, visibility hidden considered visible)
            if(!(element.prop('offsetWidth')>0 && element.prop('offsetHeight')>0)){
                $log.info("Invisible element validation case. Validating as true.");
                ctrl.$setValidity("notVisibleValidation",true);
                return;
            }

            var isValid,errorMessage,callFunction;
            for(var i= 0,l=validationCase.length;i<l;++i){
                if(angular.isFunction(validationCase[i].value)){
                    isValid = validationCase[i].value(element.val());
                }else if(angular.isArray(validationCase[i].value)){
                    var argumentsArray = validationCase[i].value.slice(1);
                    argumentsArray.unshift(element.val());
                    isValid = validationCase[i].value[0].apply(null,argumentsArray);
                }

                ctrl.$setValidity(strategy +"-"+ i,isValid);
                if(!isValid){
                    errorMessage = validationCase[i].message || "";
                    break;
                }
            }
            scope.errorStatus  = !isValid;
            scope.errorMessage = errorMessage;
            scope.$apply()

        };

        return {
            require: 'ngModel',
            scope: true,
            link: function (scope, element, attrs, ctrl) {
                element.after($compile(angular.element('<span ng-show="errorStatus" ng-bind="errorMessage"></span>'))(scope));
                scope.$on('ng-validate',function(){validationFunction(scope, element, attrs, ctrl)});
                element.on('blur',function(){
                    validationFunction(scope, element, attrs, ctrl);
                })
            }
        };


    })

.factory('ngValidateFactory',function(){
        var ngValidate = {};

        //generic function example
        ngValidate.allowedChars = function(){
            return true;
        };

        ngValidate.minLength = function(testVal,expectedVal){
            return testVal.length >= expectedVal;
        };

        ngValidate.maxLength = function(testVal,expectedVal){
            return testVal.length <= expectedVal;
        };

        ngValidate.required = function(testVal){
            return !!testVal;
        };

        ngValidate.pattern = function(testVal,patternval){
            return patternval.test(testVal);
        };

        ngValidate.emailPattern = function(testVal){
            return pattern(testVal,/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        ngValidate.equalTo = function(testVal,expectedVal){
            return testVal === expectedVal;
        };


        ngValidate.strategies = {};

        //TODO:Default Strategies

        //insert on directive init
        ngValidate.strategies.exampleStrategy1 = [
            {
                value:ngValidate.required,
                message:'This Field is required'
            },
            {
                value:[ngValidate.minLength,8],
                message:'Minimum 8 characters required'
            },
            {
                value:[ngValidate.maxLength,32],
                message:'Maximum 32 characters allowed'
            },
            {
                value: ngValidate.emailPattern,
                message: 'Not a valid email'
            },
            {
                value: ngValidate.allowedChars,
                message: 'Field does not pass custom function test 2'
            }
        ];

        ngValidate.strategies.exampleStrategy2 = [
            {
                value:ngValidate.required,
                message:'This Field is required'
            },
            {
                value:[ngValidate.maxLength,32],
                message:'Maximum 32 characters allowed'
            }
        ];

        ngValidate.strategies.exampleStrategy3 = [
            {
                value:[ngValidate.minLength,8],
                message:'Minimum 8 characters required'
            },
            {
                value:[ngValidate.maxLength,32],
                message:'Maximum 32 characters allowed'
            }
        ];

        return ngValidate;

    })