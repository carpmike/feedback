'use strict';

angular.module('myApp.controllers', ['ngResource'])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
        $rootScope.home = function(){
        	$scope.slide = 'slide-right';
        	$location.url('/people');
        }
    }])
    .controller('PeopleCtrl', ['$scope', 'people', function ($scope, people) {
        $scope.people = people.people;
    }])
  	.controller('FeedbackTypeCtrl', ['$scope', '$log','$routeParams', 'people', function ($scope, $log, $routeParams, people) {
        $scope.person = people.findById($routeParams.personId);
  	}])
    .controller('FeedbackCategoryCtrl', ['$scope', '$routeParams', 'people', 'categories', function ($scope, $routeParams, people, categories) {
        $scope.personId = people.findById($routeParams.personId).id;
        $scope.fbtypeId = $routeParams.fbtypeId;
        $scope.categories = categories.categories;
    }])
  	.controller('FeedbackNotifierCtrl', ['$scope', '$routeParams', '$resource', 'people', 'categories', function ($scope, $routeParams, $resource, people, categories) {
  		  $scope.person = people.findById($routeParams.personId);
        $scope.category = categories.findById($routeParams.fbcatId);
        var reminderService = $resource('http://feedback-web.carpmike.cloudbees.net/reminders', 
                                          {}, 
                                          {notify: {method:'POST'}}
                                        );
        reminderService.notify({"personId":$scope.person.id, "categoryId":$scope.category.id, "type":$routeParams.fbtypeId});
;  	}]);
