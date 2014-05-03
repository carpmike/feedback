angular.module('myApp.controllers', ['ngResource', 'http-auth-interceptor', 'LocalStorageModule'])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', '$route', '$http', 'authService', 'localStorageService',
        function ($scope, $rootScope, $window, $location, $route, $http, authService, localStorageService) {

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
            console.log(":FB:got the login required event with status: " + rejection.status + " and fft: " + rejection.failedFirstTry);
            // check to see if the token is in local storage and if it is, add it to the http headers, otherwise prompt the user for credentials
            var authToken = localStorageService.get('FeedbockAuthToken');
            if (!rejection.failedFirstTry && authToken) {
                $http.defaults.headers.common['x-auth-token'] = authToken;
                authService.loginConfirmed();
                return;
            }

            $rootScope.failedFirstTry = rejection.failedFirstTry;

            $scope.slide = 'slide-left';
            $location.url('/login');
            $route.reload();
        });

        // clean up the login failure flag
        $rootScope.$on('event:auth-loginConfirmed', function(event) {
            $rootScope.failedFirstTry = null;
        });

    }])
    .controller('LoginCtrl',
                ['$scope', '$rootScope', '$location', '$http', 'authService', 'localStorageService',
                function ($scope, $rootScope, $location, $http, authService, localStorageService)
        {
        console.log(":FB:in the login controller with failed first flag: " + $rootScope.failedFirstTry);
        $scope.failedFirstTry = $rootScope.failedFirstTry;

        var user = {"username":"", "password":""};
        $scope.user = user;

        $scope.login = function() {
            $http.post(fbURL + '/api/login',
                        {"username":user.username, "password":user.password},
                        {"ignoreAuthModule":true})
                .success(function(results) {

                console.log("auth token: " + results.token);
                $http.defaults.headers.common['x-auth-token'] = results.token;
                
                // store the token in local storage
                localStorageService.set('FeedbockAuthToken', results.token);

                // notify login confirmed
                authService.loginConfirmed();
                $location.url('/people');
            })
            .error(function(data,status) {
                console.log("got a failure when trying to authenticate: " + status);
                $rootScope.$broadcast('event:auth-loginRequired', {"status":status, "failedFirstTry":true});
            });
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
        var reminderService = $resource(fbURL + '/reminders',
                                          {},
                                          {notify: {method:'POST'}}
                                        );
        reminderService.notify({"personId":$routeParams.personId, "categoryId":$routeParams.fbcatId, "feedbackTypeId":$routeParams.fbtypeId});
    }]);
