'use strict';

angular.module('contactApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'ngGrid', 'angularFileUpload'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as mainCtrl'
      })
      .state('home.contactList', {
        url: 'list',
        templateUrl: 'app/contact/list.html',
        controller: 'contactListController'
      })
      .state('home.contactProfile', {
        url:'profile/:contactId',
        templateUrl: 'app/contact/profile.html',
        controller: 'contactProfileController'
      })
      .state('home.mailings', {
        url:'mailings',
        templateUrl: 'app/mailing/list.html',
        controller: 'mailingController'
      })
      .state('home.mailingsProfile', {
        url:'mailingsProfile/:templateId',
        templateUrl: 'app/mailing/profile.html',
        controller: 'mailingProfileController'
      }) .state('home.send', {
        url:'send',
        templateUrl: 'app/mailing/send.html',
        controller: 'sendController'
      })

    ;

    $urlRouterProvider.otherwise('/');
  })
;
