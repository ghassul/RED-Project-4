/**
 * Created by Blaze on 2015-10-20.
 */
(function() {
    var app = angular.module('app', []);

    //.run(['$rootScope', function($rootScope){
    //
    //}]);


    app.controller('CheckinCtrl', ['$scope', function($scope){

        $scope.showValidation = false;

        $scope.enter = function(e){
            e.preventDefault();

            if ($scope.checkInForm.$invalid) {
                $scope.showValidation = true;
            }
        };
    }]);


    app.controller('ReportCtrl', ['$scope', function($scope){

        $scope.showValidation = false;

        $scope.enter = function(e){
            e.preventDefault();

            if ($scope.checkInForm.$invalid) {
                $scope.showValidation = true;
            }
        };
    }]);
})();