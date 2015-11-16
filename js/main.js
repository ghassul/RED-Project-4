/**
 * Created by Blaze on 2015-10-20.
 */
(function() {
    var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngTouch', 'ngCookies'])

    .run(runBlock);

    function runBlock($log, $rootScope, $state) {

        $rootScope.$state = $state;

        $log.debug('Hello - Your app is running!');

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.stateName = toState.name;
        });
    }

        app.config(['$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            function($stateProvider,
                     $urlRouterProvider,
                     $locationProvider){

                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false,
                    rewriteLinks: false
                });

                $stateProvider
                    .state('welcome', {
                        url: '/',
                        templateUrl: 'home.html',
                        controller: 'WelcomeCtrl'
                    })
                    .state('checkin', {
                        url: '/checkin',
                        templateUrl: 'checkin.html',
                        controller: 'CheckinCtrl',
                        resolve: {
                            user: ['$cookies', function($cookies){
                                if($cookies.getObject('colonist')){
                                    $state.go('encounters');
                                }
                            }]
                        }
                    })
                    .state('encounters', {
                        url: '/encounters',
                        templateUrl: 'encounters.html',
                        controller: 'EncountersCtrl'
                    })
                    .state('report', {
                        url: '/report',
                        templateUrl: 'report.html',
                        controller: 'ReportCtrl'
                    })
    }]);


    app.controller('WelcomeCtrl', ['$scope', '$state', '$cookies', function($scope, $state, $cookies){

        $cookies.putObject('colonist', undefined);

        $scope.next = function(){
            $state.go('checkin');
        };
    }]);


    app.controller('CheckinCtrl', ['$scope', '$state', '$http', '$cookies', function($scope, $state, $http, $cookies){

        var API_URL_GET_JOBS = "https://red-wdp-api.herokuapp.com/api/mars/jobs";
        var API_URL_CREATE_COLONIST = "https://red-wdp-api.herokuapp.com/api/mars/colonists";

        $http.get(API_URL_GET_JOBS)
            .then(function(response){
                $scope.jobs = response.data.jobs;
            });

        $scope.colonist = {};

        $scope.showValidation = false;

        $scope.prev = function(){
            $state.go('welcome');
        };

        $scope.enter = function(e){
            e.preventDefault();

            if ($scope.checkInForm.$invalid) {
                $scope.showValidation = true;

            } else {

                $http({
                    method: 'POST',
                    url: API_URL_CREATE_COLONIST,
                    data: { colonist: $scope.colonist }

                }).then(function(response){
                    $cookies.putObject('colonist', response.data.colonist);
                    $state.go('encounters');
                })
            }
        };
    }]);


    app.controller('EncountersCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {

        var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

        $http.get(ENCOUNTERS_API_URL)
            .then(function(response){

                $scope.encounters = response.data.encounters;
            });

        $scope.message = {
            text: 'hello world!',
            time: new Date()
        };

        $scope.next = function(){
            $state.go('report');
        };

        $scope.prev = function(){
            $state.go('checkin');
        };

    }]);


    app.controller('ReportCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){

        var ALIEN_TYPE_API_URL = "https://red-wdp-api.herokuapp.com/api/mars/aliens";
        var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

        $http.get(ALIEN_TYPE_API_URL)
            .then(function(response){

                $scope.aliens = response.data.aliens;
            });

        $scope.report = {};
        $scope.report.colonist_id = 142;
        $scope.report.date = "1899-05-10";

        $scope.showValidation = false;

        $scope.prev = function(){
            $state.go('encounters')
        };

        $scope.submit = function(e){
            e.preventDefault();

            if ($scope.reportForm.$invalid) {
                $scope.showValidation = true;
            } else {
                $http({
                    method: 'POST',
                    url: ENCOUNTERS_API_URL,
                    data: { encounter: $scope.report }
                }).then(function(){
                    alert("Submitted");
                    $state.go('encounters');
                });
            }
        };
    }]);
})();