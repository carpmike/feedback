angular.module('myApp.restServices', ['ngResource'])
    .factory('person', ['$resource',
        function ($resource) {
            return $resource('http://feedback-web.carpmike.cloudbees.net/persons');
        }])    
    .factory('category', ['$resource',
        function ($resource) {
            return $resource('http://feedback-web.carpmike.cloudbees.net/categories');
        }]);