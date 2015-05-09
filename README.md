ng-validate (Angular form validations with error messages)
=====================
An Angular module for Form Validation with inline error messages, **v0.0.2**

MIT License

##Quick Example

Check out the full demo at http://plnkr.co/edit/T2imkFf1yYKPB2ljkYtR

###HTML
```html
<form name="demo-form">
    <input name="demo-input-1" ng-model="demo.input1" ng-validate="demoValidationStrategy">
</form>
```
###Javascript
Inject `ngValidateFactory` in your module and extend the `strategies` object
```js
ngValidateFactory.strategies.demoStrategy = [
    {
        value:ngValidate.required;
        message:"This field is required"
    },
    {
        value:[ngValidate.minLength,8];
        message:"Minimum 8 characters are required"
    },
    {
        value:myFunction;
        message:"This field fails my custom function test"
    }]
```

###Important
**1.** **Invisible elements are validated as true.** Elements are considered invisible if width and height are zero. Hence `visibility:hidden` will not be considered invisible.

**2.** **Disabled elements are validates as true.**

**3.** **Broadcast** `ng-validate` to validate all fields at once. Ex: `$scope.$broadcast('ng-validate')`


##Table of contents:
- [Get Started](#get-started)
- [Development](#development)
- [Usage Example](#usage)
    - [Inbuilt Strategies](#inbuilt-strategies)
        - [required](#required)
        - [minLength](#minLength)
        - [maxLength](#maxLength)
        - [pattern](#pattern)
        - [email](#email)
    - [Custom Strategies](#custom-strategies)
    - [Event](#ng-validate-event)
    - [Special Attributes](#specia-attributes)
        - [optional](#optional)
- [API Documentation](#api-documentation)
    - [ngValidate.strategies Object](#ngValidate-strategies)
        - [required](#required)
        - [minLength](#minLength)
        - [maxLength](#maxLength)
        - [pattern](#pattern)
        - [email](#email)

##Get Started
**1** Download and include `ngValidate.js` from [src](https://github.com/RijulB/ngValidate/blob/master/src) directory in your `index.html`, after including Angular itself.

**2** Add `'ngValidateModule'` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>

</head>
<body>
    ...
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular.min.js"></script>
    <script src="bower_components/js/ngValidate.js"></script>
    ...
    <script>
        var myApp = angular.module('myApp', ['ngValidateModule']);

    </script>
    ...
</body>
</html>
```

##Usage Example
ngValidate uses strategies to validate your input field.
Begin by naming your validation strategy. For ex: `demoValidationStrategy`.
```
<input name="demo-input-1" ng-model="demo.input1" ng-validate="demoValidationStrategy">
```

Next, define `demoValidationStrategy` by extending `strategies` object returned by `ngValidateFactory`.
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: ngValidateFactory.required,
        message:"This field is required"
    },
    {
        value: [ngValidateFactory.minLength,8],
        message:"This field is required"
    }
]
```

And that's it. Your validations are set.

ngValidate sets the `$valid` property of the input. This affects the containing form also.

###Inbuilt Strategies
Some common strategies are available by default.

####required
Usage: `ng-validate="required"`

Returns truthy value of input value

Default Error Message: "This field is required"

####minLength
Usage: `ng-validate="minLength"`

Example: `ng-validate="minLength"`

Default Error Message: "Minimum 8 characters required"

Note: Use `ngValidateFactory.strategies.minLength.value[1]` to set length value. Default is 8.

Example `ngValidateFactory.strategies.minLength.value[1] = 10`

####maxLength
Usage: `ng-validate="maxLength"`

Example: `ng-validate="maxLength"`

Default Error Message: "Maximum 32 characters allowed"

Note: Use `ngValidateFactory.strategies.maxLength.value[1]` to set length value. Default is 32.

Example `ngValidateFactory.strategies.maxLength.value[1] = 40`


####pattern
Usage: `ng-validate="pattern"`

Input value should match `<regex-pattern>`.

Example: `ng-validate="pattern"`

Default Error Message: "Invalid characters"

Note: Use `ngValidateFactory.strategies.pattern.value[1]` to set test pattern. Default is none.

Example `ngValidateFactory.strategies.pattern.value[1] = /^[0-9]$/`

####email
Usage: `ng-validate="email"`

Returns if input matches `/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`

Default Error Message: "Please enter valid email address"

###Custom Strategies
You can build your custom strategies by by extending `strategies` object returned by `ngValidateFactory`.
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: myCustomFunction1,
        message:"This is a custom message 1"
    },
    {
        value: [myCustomFunction2,arg1,arg2],
        message:"This is a custom message 2"
    }
]
```

You can add inbuilt functions also.
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: ngValidateFactory.required,
        message:"This is a custom message 1"
    },
    {
        value: [ngValidateFactory.pattern,/^[0-9]$/],
        message:"This is a custom message 2"
    },
    {
        value: myCustomFunction1,
        message:"This is custom message 3"
    }
]
```
###Event
Validations get triggered using two methods.

**1.**
On Input blur


**2.**
`ng-validate` event

Example: `$scope.$broadcast('ng-validate')`

###Special Attributes
ngValidate provides some special attributes to add particular functionality.

####optional
This attribute validates the element as true if its length is zero. Otherwise, it will check against the strategy mentioned. This is useful when you want an input field to be optional but match certain conditions. For ex an optional password but minimum length 8.

Usage: `ng-validate="[your strategy]" optional[or optional=true]`

Example: `<input name="demo-input-1" ng-model="demo.input1" ng-validate="demoValidationStrategy" optional>`

##API Documentation
###ngValidateFactory.strategies Object
`ngValidate` uses the strategies object to define validation strategies.

###ngValidateFactory.required Function
**Returns** true if input value is truthy.

**Usage**
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: ngValidateFactory.required,
        message:"This is a custom message"
    }
]
```

###ngValidateFactory.minLength Function
**Expects** one argument, minimum length

**Returns** true if input length is more than or equal to min value.

**Usage**
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: [ngValidateFactory.minLength,8],
        message:"This is a custom message"
    }
]
```

###ngValidateFactory.maxLength Function
**Expects** one argument, maximum length

**Returns** true if input length is less than max value.

**Usage**
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: [ngValidateFactory.maxLength,32],
        message:"This is a custom message"
    }
]
```

###ngValidateFactory.pattern Function
**Expects** one argument, regex expression

**Returns** true if input matches regex expression.

**Usage**
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: [ngValidateFactory.pattern,/^[0-9]$/],
        message:"This is a custom message"
    }
]
```

###ngValidateFactory.email Function
**Returns** true if input matches `/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`

**Usage**
```js
ngValidateFactory.strategies.demoValidationStrategy = [
    {
        value: ngValidateFactory.email,
        message:"This is a custom message"
    }
]
```

Check out the full demo at http://plnkr.co/edit/T2imkFf1yYKPB2ljkYtR

##Development:
* Don't forget about tests.
* If you planning add some feature please create issue before.

Clone the project:
```sh
$ git clone https://github.com/<your-repo>/ngValidate.git
$ npm install
$ bower install
```
Run the tests:
```sh
$ grunt test
```
**Deploy:**<br/>
Run the build task, update version before(bower,package)
```sh
$ grunt dist
$ git tag 0.*.*
$ git push origin master --tags
```