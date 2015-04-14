'use strict';
window.angular.module('demoModule', ['ngValidateModule'])
//.config(function(localStorageServiceProvider){
//  localStorageServiceProvider.setPrefix('demoPrefix');
//  // localStorageServiceProvider.setStorageCookieDomain('example.com');
//  // localStorageServiceProvider.setStorageType('sessionStorage');
//})
.controller('DemoCtrl',
  function($scope) {
      $scope.user = {};
  }
);
