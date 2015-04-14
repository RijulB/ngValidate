/**
 * Created by acr on 4/14/2015.
 */
var module = angular.module('ngValidateModule',[]);

module
    .directive('ngValidate', function ($log,$compile) {

        //generic function example
        var allowedChars = function(){
            console.log("in allowed chars");
            return true;
        };

        var minLength = function(testVal,expectedVal){
            console.log("in minlength");
            return testVal.length >= expectedVal;
        };

        var maxLength = function(testVal,expectedVal){
            console.log("in maxlength");
            return testVal.length <= expectedVal;
        };

        var required = function(testVal){
            console.log("in required");
            return !!testVal;
        };

        var pattern = function(testVal,patternval){
            console.log("in pattern");
            return patternval.test(testVal);
        };

        var emailPattern = function(testVal){
            console.log("in email pattern");
            return pattern(testVal,/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        var equalTo = function(testVal,expectedVal){
            console.log("in equalTo");
            return testVal === expectedVal;
        };

        var exampleStrategy = [
                {
                    value:required,
                    message:'This Field is required'
                },
                {
                    value:[minLength,8],
                    message:'Minimum 8 characters required'
                },
                {
                    value:[maxLength,32],
                    message:'Maximum 32 characters allowed'
                },
                {
                    value: emailPattern,
                    message: 'Not a valid email'
                },
                {
                    value: allowedChars,
                    message: 'Field does not pass custom function test 2'
                }
            ];


        var validationStrategies = {};

        //insert on directive init
        validationStrategies.exampleStrategy = exampleStrategy;
        validationStrategies.exampleStrategy2 = [
            {
                value:required,
                message:'This Field is required'
            },
            {
                value:[maxLength,32],
                message:'Maximum 32 characters allowed'
            }

        ];
        validationStrategies.exampleStrategy3 = [
            {
                value:[minLength,8],
                message:'Minimum 8 characters required'
            },
            {
                value:[maxLength,32],
                message:'Maximum 32 characters allowed'
            }

        ];

        var validationFunction = function (scope, elem, attrs, ctrl) {

            var strategy = attrs.ngValidate;
            var validationCase = validationStrategies[strategy];
            $log.info("Strategy Name: " + strategy);
            $log.info("validationStrategies[" + strategy + "] is : " + validationCase);

            if(!validationCase || !angular.isArray(validationCase) || validationCase.length==0){
                $log.info("Invalid validation case. Validating as true.");
                ctrl.$setValidity("emptyValidation",true);
            }

            //check controller visibility
            var isValid,errorMessage,callFunction;
            for(var i= 0,l=validationCase.length;i<l;++i){
                if(angular.isFunction(validationCase[i].value)){
                    isValid = validationCase[i].value(elem.val());
                }else if(angular.isArray(validationCase[i].value)){
                    var argumentsArray = validationCase[i].value.slice(1);
                    argumentsArray.unshift(elem.val());
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
            link: function (scope, elem, attrs, ctrl) {
                scope.errorMessage="fail"
                elem.after($compile(angular.element('<span ng-show="errorStatus" ng-bind="errorMessage"></span>'))(scope));
                //elem.after('<span ng-show="errorStatus" ng-bind="errorMessage"></span>');
                scope.$on('ng-validate',function(){validationFunction(scope, elem, attrs, ctrl)});
                elem.on('blur',function(){validationFunction(scope, elem, attrs, ctrl)})
            }
        };


    });