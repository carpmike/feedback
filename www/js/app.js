'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.restServices',
    'myApp.domainClasses'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/people', {templateUrl: 'partials/people.html', controller: 'PeopleCtrl'});
    $routeProvider.when('/people/:personId/fbtype', {templateUrl: 'partials/feedback-type.html', controller: 'FeedbackTypeCtrl'});
    $routeProvider.when('/people/:personId/fbtype/:fbtypeId/fbcat', {templateUrl: 'partials/feedback-categories.html', controller: 'FeedbackCategoryCtrl'});
    $routeProvider.when('/people/:personId/fbtype/:fbtypeId/fbcat/:fbcatId/notify', {templateUrl: 'partials/feedback-notification.html', controller: 'FeedbackNotifierCtrl'});
    $routeProvider.otherwise({redirectTo: '/people'});
}]);