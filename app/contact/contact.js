angular.module('contactApp')
.controller("contactListController", function($scope, $state, contactService){
  //this controller will be use for list view
  //we will be defining an factory contain an array
  $scope.contactListArray = [];
  $scope.receivedItems = [];

  $scope.reloadList = function(){
    contactService.list().success(function (response){
      $scope.contactListArray = response;
    });
  };

  $scope.reloadList();
  //we will be defining the ng grid defination here
  $scope.gridOptions = {
    data : "contactListArray",
    columnDefs : [
      {
        displayName : "",
        field : "id",
        width : "5%",
        cellTemplate : '<div class="ngCellText" ng-class="col.colIndex()"><span ng-click="editProfile(row)" class="glyphicon glyphicon-edit" aria-hidden="true" ></span></div>'
      },{
        displayName : "First Name",
        field : "firstName",
        width : "20%",
        cellTemplate: '<div ng-click="onRowClick(row)" class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'
    }, {
      displayName : "Last Name",
      field : "lastName",
      width : "20%",
        cellTemplate: '<div ng-click="onRowClick(row)" class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'
    }, {
      displayName : "Email",
      field : "email",
      width : "25%",
        cellTemplate: '<div ng-click="onRowClick(row)" class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'
    },{
      displayName : "Job Title",
      field : "jobTitle",
      width : "30%",
        cellTemplate: '<div ng-click="onRowClick(row)" class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'
    }
    ]
    , enableRowSelection : true
    , multiSelect : false
    , showFooter : true
  };

    $scope.onRowClick = function(row){
      $scope.receivedItems = row.getProperty("receivedEmails");
    };

    $scope.editProfile = function(row){
      var contactId = row.getProperty("contactId");
      if(contactId){
          //console.log(contactId);
          $state.go('home.contactProfile', {'contactId' : contactId});
      }
    }
})
.controller("contactProfileController", function($scope, $state, $stateParams, contactService){
  //this controller will be use for profile view
  var contactId = $stateParams.contactId;
  $scope.selectedContact = {};

  $scope.loadContact = function(contactId){
      contactService.get(contactId).success(function(response){
        $scope.selectedContact = response;
      })
  };

  console.log(contactId);
  if(contactId) {
    $scope.hideAddButton = false;
    $scope.loadContact(contactId);
  } else {
    $scope.hideAddButton = true;
  }

  $scope.addContact = function (){
    contactService.save($scope.selectedContact).success(function(response){
      $state.go('home.contactList', {}, {reload: true});
    });
  };

  $scope.cancel = function(){
    $state.go('home.contactList');
  };
})
  .directive("formDirective", function(){
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      scope: {
        title: '@',
        attribute : '='
      },
      templateUrl: '/app/contact/formTemplate.html'
    }
  });

