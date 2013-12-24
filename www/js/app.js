'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.restServices'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/receivers', {templateUrl: 'partials/employee-list.html', controller: 'EmployeeListCtrl'});
    $routeProvider.when('/feedback/:employeeId', {templateUrl: 'partials/feedback-choose.html', controller: 'FeedbackChooseCtrl'});
    $routeProvider.when('/categorize/:employeeId:positive', {templateUrl: 'partials/feedback-categories.html', controller: 'FeedbackCategorizeCtrl'});
    $routeProvider.when('/notify/:employeeId:positive', {templateUrl: 'partials/feedback-notification.html', controller: 'FeedbackNotifierCtrl'});
    $routeProvider.otherwise({redirectTo: '/receivers'});
}]);