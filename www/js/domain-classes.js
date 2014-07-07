'use strict';

function findInList(list, id) {
    var it = null,
        l = list.length,
        i;
    for (i = 0; i < l; i = i + 1) {
        if (list[i].id == id) {
            it = list[i];
            break;
        }
    }
    return it;
}

// var fbURL = 'http://feedback-web.carpmike.cloudbees.net';
var fbURL = 'http://localhost:8080/feedback-web';
var to = 2000; // 2 second timeout

angular.module('myApp.domainClasses', [])
    .factory('people', ['$http', function ($http) {
        var people = {
            // returns a promise to get the people
            getPeople: function() {
                var peoplePromise = $http.get(fbURL + '/persons?max=50', { timeout: to })
                    .then(function(results){
                        //Success;
                        console.log(":FB:Success: " + results.status + "::" + results.data);
                        return results.data;               
                    }, function(results){
                        //error
                        console.log(":FB:Error: " + results.status);
                        return results.data;
                    });

                return peoplePromise;
            }
        };

        return people;
    }])
    .factory('categories', ['$http', function ($http) {
        var categories = {
            // returns a promise to get the categories
            getCategories: function() {
                var categoriesPromise = $http.get(fbURL + '/categories', { timeout: to })
                    .then(function(results){
                        //Success;
                        console.log("Success: " + results.status);
                        return results.data;               
                    }, function(results){
                        //error
                        console.log("Error: " + results.status);
                        return results.data;
                    });

                return categoriesPromise;
            }            
        };

        return categories;
    }]);

