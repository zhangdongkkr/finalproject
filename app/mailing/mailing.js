/**
 * Created by kkrcentralit on 3/9/15.
 */
angular.module('contactApp')
.controller('mailingController', function($scope, $state, mailingService ){
    //controller for creating new mailing list
    $scope.marketing = [];
    $scope.reloadList = function(){
      mailingService.list().success(function(response){
        $scope.marketing = response;
      });
    };
    $scope.reloadList();
    $scope.gridOptions = {
      data : "marketing",
      columnDefs : [
        {
          displayName : "",
          field : "templateId",
          width : "3%",
          cellTemplate : '<div class="ngCellText" ng-class="col.colIndex()"><span ng-click="editProfile(row)" class="glyphicon glyphicon-edit" aria-hidden="true" ></span></div>'
        },{
          displayName : "Title",
          field : "title",
          width : "27%"
        }, {
          displayName : "Subject",
          field : "subject",
          width : "30%"
        }, {
          displayName : "Body",
          field : "body",
          width : "30%"
        }, {
          displayName : "Date Created",
          field : "dateCreated",
          width : "10%"
        }
      ]
      , enableRowSelection : true
      , multiSelect : false
      , showFooter : true
    };

    $scope.editProfile = function(row){
      var templateId = row.getProperty("templateId");
      console.log(templateId);
      $state.go('home.mailingsProfile', {'templateId' : templateId});
    }
})
.controller("mailingProfileController", function($scope, $state,$stateParams, FileUploader, mailingService){
    var templateId = $stateParams.templateId;
    $scope.selectedTemplate = {};
    if(templateId > 0){
      mailingService.get(templateId).success(function(response){
        $scope.selectedTemplate = response;
      })
      $scope.hideAddButton = false;
    }else {
      $scope.hideAddButton = true;
    }
    console.log(mailingService.uploadUrl());
    $scope.uploader = new FileUploader({
      url: mailingService.uploadUrl()
    });

    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.log(response);
      //we need to disable the upload button
      //we will need to create a place holder id for this upload
    };

    $scope.addTemplate = function(){
      mailingService.save($scope.selectedTemplate).success(function(response){
        $state.go('home.mailings', {}, {reload: true});
      });
    };

    $scope.cancel = function(){
      $state.go('home.mailings');
    };

    $scope.submitForm = function(form){
      if($scope.uploader.queue.length > 0){
        if($scope.selectedTemplate.templateId > 0){
          $scope.uploader.queue[0].url += "/" + templateId;
        }
        $scope.uploader.queue[0].upload();
      }else{
        mailingService.save($scope.selectedTemplate).success(function(response){
          $state.go('home.mailings');
        });
      }
    }

    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
      //we need to submit the form from here
     // $state.go("home.contactList", {}, {reload: true});
      console.log("we need to submit the form now");
      $scope.selectedTemplate.templateId = response;
      mailingService.save($scope.selectedTemplate).success(function(response){
        $state.go('home.mailings');
      });
    };

 })
  .controller("sendController", function($scope, mailingService, contactService, sendService){
    $scope.templateList = [];

    mailingService.list().success(function(response){
      $scope.templateList = response;
    });

    $scope.submitForm = function(){
      console.log("I am submitting the form from here");
      sendService.save($scope.selectedTemplate).success(function(response){
        console.log("we have submitted the form.... lets spamming ppl");
      });
    };

  })
;
