/**
 * Created by Moshe on 10/06/2017.
 */
angular.module('myApp').controller('CommandController', ['$http' , '$scope' , '$rootScope' ,
    function ($http,$scope , $rootScope) {
        $scope.commands = [];
        $http.get($rootScope.serverAddDomain +  $rootScope.serverPortDomain + '/myAccount/commands/' + $rootScope.loginAccount.accId).then(
            function (response) {
                var commandsTmp = response.data;
                for(var i = 0 ; i < commandsTmp.length ; i++){
                    var commandTmp = {
                        myCommandId : commandsTmp[i].myCommandId,
                        cmdType : commandsTmp[i].cmdType,
                        stockName : commandsTmp[i].stockName,
                        stockId : commandsTmp[i].stockId,
                        minPrice : commandsTmp[i].minPrice,
                        maxPrice :  commandsTmp[i].maxPrice,
                        amount :  commandsTmp[i].amount,
                        cmdStatusId :  commandsTmp[i].cmdStatusId
                    };
                    $scope.commands.push(commandTmp);
                }
            },function (err) {
                alert("Error occurred!")
            }
        )
    }])