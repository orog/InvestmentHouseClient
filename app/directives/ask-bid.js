/**
 * Created by orgivati on 10/06/2017.
 */
angular.module("myApp").directive("askBidForm" ,['$rootScope',  function ($rootScope) {
    return {
        restrict : 'E',
        scope : {
            cmdType : '=',
            stockId : '=',
            stockName : '=',
            stockAmount : '='
        } ,
        templateUrl : "templates/ask-bid.html",
        controller : ['$rootScope','$scope','$http' ,function ($rootScope, $scope,$http) {
            if($scope.cmdType === 1){
                $scope.cmdName = "Bid";
            }else {
                $scope.cmdName = "Ask";
            }
            $scope.command = {
                commandType : $scope.cmdType ,
                stockId : $scope.stockId ,
                stockName : $scope.stockName,
                minPrice  : 0 ,
                maxPrice : 0 ,
                amount : 0 ,
                accId : $rootScope.loginAccount.accId
            };
            $scope.sendCommand = function (command) {
                $scope.command.minPrice = command.minPrice;
                $scope.command.maxPrice = command.maxPrice;
                if($scope.stockAmount != null && command.amount > $scope.stockAmount){
                    alert("You have only " + $scope.stockAmount + " stocks.");
                    return;
                }
                $scope.command.amount = command.amount;
                $http.post($rootScope.serverAddDomain  + $rootScope.serverPortDomain + "/commandRequest" , command).then(
                    function (response) {
                        if(response.data){
                            alert("Command committed!" + " no. " + response.data);
                        }else{
                            alert("Error Occurred! Try later!");
                        }
                    } , function (err) {
                        alert(err);
                    }
                )
            }
        }]
    }
    }]
    
);