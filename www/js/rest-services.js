angular.module('myApp.restServices', ['ngResource'])
    .factory('person', ['$resource',
        function ($resource) {
            return $resource(fbURL + '/persons');
        }])    
    .factory('category', ['$resource',
        function ($resource) {
            return $resource(fbURL + '/categories');
        }]);