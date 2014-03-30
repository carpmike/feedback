angular.module('myApp.controllers', ['ngResource'])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        };
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        };
        $rootScope.home = function(){
        	$scope.slide = 'slide-right';
        	$location.url('/people');
        };

        // handle the authn error by forcing login - uses the auth.js modules
        $rootScope.$on('event:auth-loginRequired', function(event, rejection) {
            console.log(":FB:got the login required event with status: " + rejection.status);  
            $scope.slide = 'slide-left';
            $location.url('/login');
        });

    }])
    .controller('LoginCtrl', ['$scope', '$location', '$http', 'authService', function ($scope, $location, $http, authService) {
        var user = {"username":"", "password":""};
        $scope.user = user;

        $scope.login = function() {
            var encodedUserNameAndPassword = window.btoa(user.username + ':' + user.password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedUserNameAndPassword;
            console.log(":FB:auth string: " + $http.defaults.headers.common['Authorization']);
            authService.loginConfirmed();
            $location.url('/people');
        };
    }])
    .controller('PeopleCtrl', ['$scope', 'people', function ($scope, people) {
        people.getPeople().then(function(results) {
            $scope.people = results;
        });
    }])
  	.controller('FeedbackTypeCtrl', ['$scope', '$routeParams', 'people', function ($scope, $routeParams, people) {
        people.getPeople().then(function(results) {
            $scope.person = findInList(results, $routeParams.personId);
        });
  	}])
    .controller('FeedbackCategoryCtrl', ['$scope', '$routeParams', 'categories', function ($scope, $routeParams, categories) {
        $scope.personId = $routeParams.personId;
        $scope.fbtypeId = $routeParams.fbtypeId;
        categories.getCategories().then(function(results) {
            $scope.categories = results;
            console.log(":FB:cats retrieved");
        });
    }])
  	.controller('FeedbackNotifierCtrl', ['$scope', '$routeParams', '$resource', function ($scope, $routeParams, $resource) {
  	     // $scope.person = people.findById($routeParams.personId);
        // $scope.category = categories.findById($routeParams.fbcatId);

        var reminderService = $resource(fbURL + '/reminders', 
                                          {}, 
                                          {notify: {method:'POST'}}
                                        );
        reminderService.notify({"personId":$routeParams.personId, "categoryId":$routeParams.fbcatId, "feedbackTypeId":$routeParams.fbtypeId});
  	}]);
