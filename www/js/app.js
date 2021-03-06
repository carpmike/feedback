var fbURL = 'http://feedback-web.carpmike.cloudbees.net';
// var fbURL = 'http://localhost:8080/feedback-web';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'http-auth-interceptor',
    'myApp.controllers',
    'myApp.domainClasses'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/people', {templateUrl: 'partials/people.html', controller: 'PeopleCtrl'});
    $routeProvider.when('/people/:personId/fbtype', {templateUrl: 'partials/feedback-type.html', controller: 'FeedbackTypeCtrl'});
    $routeProvider.when('/people/:personId/fbtype/:fbtypeId/fbcat', {templateUrl: 'partials/feedback-categories.html', controller: 'FeedbackCategoryCtrl'});
    $routeProvider.when('/people/:personId/fbtype/:fbtypeId/fbcat/:fbcatId/notify', {templateUrl: 'partials/feedback-notification.html', controller: 'FeedbackNotifierCtrl'});
    $routeProvider.otherwise({redirectTo: '/people'});
}]);