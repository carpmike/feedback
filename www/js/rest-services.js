angular.module('myApp.restServices', ['ngResource'])
    .factory('Employee', ['$resource',
        function ($resource) {
            return $resource('http://feedback-web.carpmike.cloudbees.net/persons', {});
        }])    
    .factory('Category', ['$resource',
        function ($resource) {
            return $resource('http://feedback-web.carpmike.cloudbees.net/categories', {});
        }]);