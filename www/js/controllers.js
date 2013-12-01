'use strict';

angular.module('myApp.controllers', [])
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
        	$location.url('/receivers');
        }
    }])
    .controller('EmployeeListCtrl', ['$scope', 'Employee', function ($scope, Employee) {
        $scope.employees = Employee.query();
    }])
	.controller('FeedbackChooseCtrl', ['$scope', '$routeParams', 'Employee', function ($scope, $routeParams, Employee) {
	    $scope.employee = Employee.get({employeeId: $routeParams.employeeId});
	}])
	.controller('FeedbackNotifierCtrl', ['$scope', '$routeParams', 'Employee', function ($scope, $routeParams, Employee) {
		$scope.employee = Employee.get({employeeId: $routeParams.employeeId});
	}])
	.controller('FeedbackCategorizeCtrl', ['$scope', '$routeParams', 'Employee', 'Category', function ($scope, $routeParams, Employee, Category) {
		$scope.employee = Employee.get({employeeId: $routeParams.employeeId});
		$scope.categories = Category.query();
		$scope.showSettings = false;
	    $scope.changeSettings = function () {
	        $scope.showSettings = true;
	    };
	    $scope.closeOverlay = function () {
	        $scope.showSettings = false;
	    };
	}]);
