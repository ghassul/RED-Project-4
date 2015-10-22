/**
 * Created by Blaze on 2015-10-20.
 */
(function() {
    var app = angular.module('app', []);

    //.run(['$rootScope', function($rootScope){
    //
    //}]);


    app.controller('CheckinCtrl', ['$scope', function($scope){

        $scope.user = {};

        $scope.showValidation = false;

        $scope.enter = function(e){
            e.preventDefault();

            if ($scope.checkInForm.$invalid) {
                $scope.showValidation = true;
            }
        };

        //$scope.submit = function(){
        //    if($scope.checkinForm.$valid){
        //        alert('Submitted!');
        //    } else {
        //        alert('Test2');
        //    }
        //};

    }]);


    app.controller('ReportCtrl', ['$scope', function($scope){

        $scope.report = {};
        $scope.junk = "Test";

        $scope.reset = function(){
            $scope.reportForm.$setPristine();
            $scope.reportForm.$setUntouched();


        };

        $scope.submit = function(){
            if($scope.reportForm.$valid){
                alert('Submitted!');
            } else {
                alert('Test2');
            }
        };

    }]);
})();