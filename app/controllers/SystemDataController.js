/**
 * Created by Moshe on 10/06/2017.
 */
angular.module('myApp').controller('SystemDataController', ['$http', '$scope', '$rootScope',
    function ($http, $scope, $rootScope) {
        $scope.systemData = {
            revenue : -1,
            commission : -1
        };
        $http.get($rootScope.serverAddDomain  + $rootScope.serverPortDomain +'/systemData').then(
            function (response) {
                $scope.systemData.revenue = response.data.revenue;
                $scope.systemData.commission = response.data.commission;
            }
            ,function (err) {
                alert("Error Occurred!")
            }
        )
        $scope.updateCommission = function (commission) {
            $http({
                method: 'post',
                url: $rootScope.serverAddDomain  + $rootScope.serverPortDomain +'/systemData/updateCommission',
                data: commission
            }).then(function (response) {
                if(response.data){
                    alert("Commission updated!");
                    $scope.systemData.commission = commission;
                }
            },function (err) {
                alert("Error Occurred!");
            })
        }
    }
]);