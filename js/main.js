/**
 * Created by Blaze on 2015-10-20.
 */
(function() {
    var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngTouch'])

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
                        controller: 'CheckinCtrl'
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



    app.controller('WelcomeCtrl', ['$scope', '$state', function($scope, $state){
        $scope.next = function(){
            $state.go('checkin');
        }
    }]);




    app.controller('CheckinCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){

        var API_URL_GET_JOBS = "https://red-wdp-api.herokuapp.com/api/mars/jobs";
        var API_URL_CREATE_COLONIST = "https://red-wdp-api.herokuapp.com/api/mars/colonists";


        $http.get(API_URL_GET_JOBS)
            .then(function(response){

                $scope.jobs = response.data;

                console.log(response.data.data);

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

                //$http.post({
                //    url: API_URL_CREATE_COLONIST,
                //    data: {}
                //
                //}).then(function(){
                    $state.go('encounters');
                //})




            }
        };
    }]);



    app.controller('EncountersCtrl', ['$scope', '$state', function($scope, $state) {

        $scope.next = function(){
            $state.go('report');
        };

        $scope.prev = function(){
            $state.go('checkin');
        };

    }]);


    app.controller('ReportCtrl', ['$scope', '$state', function($scope, $state){

        $scope.report = {};

        $scope.showValidation = false;

        $scope.prev = function(){
            $state.go('encounters')
        };

        $scope.enter = function(e){
            e.preventDefault();

            if ($scope.checkInForm.$invalid) {
                $scope.showValidation = true;
            }
        };
    }]);
})();