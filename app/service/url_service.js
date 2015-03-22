angular.module('contactApp').factory("contactService", ['$http', 'BASE_URL', function($http, BASE_URL){
    var service = [];
    var url = BASE_URL + "project_contact";
    service.get = function (contactId){
      return $http.get(url + "/" + contactId);
    };

    service.list = function (){
      return $http.get(url + "/list");
    }

    service.save = function(params){
      return $http.post(url, params);
    }

    service.uploadUrl = function(){
      return url + "/upload";
    }
    return service;
  }
  ]
);
angular.module('contactApp').factory("mailingService", ['$http', 'BASE_URL', function($http, BASE_URL){
    var url = BASE_URL + "project_email_template";
    var service = [];
    service.get = function (templateId){
      return $http.get(url + "/" + templateId);
    };

    service.list = function (){
      return $http.get(url + "/list");
    }

    service.save = function(params){
      return $http.post(url, params);
    }

    service.uploadUrl = function(){
      return url + "/upload";
    }
    return service;
  }
  ]
);

angular.module('contactApp').factory("sendService", ['$http', 'BASE_URL', function($http, BASE_URL){
    var url = BASE_URL + "project_send_marketing";
    var service = [];

    service.save = function(params){
      return $http.post(url, params);
    }
    return service;
  }
  ]
);
