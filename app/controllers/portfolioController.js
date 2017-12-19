/**
 * Created by orgivati on 10/06/2017.
 */
angular.module("myApp").controller("portfolioController", ['$scope', '$location', '$rootScope', '$http',
    function ($scope, $location, $rootScope, $http) {
        $scope.totalWorth = 0;
        $scope.stocks = [];
        $http.get($rootScope.serverAddDomain + $rootScope.serverPortDomain + '/myAccount/totalWorth/' + $rootScope.loginAccount.accId).then(
            function (worth) {
                $scope.totalWorth = worth.data;
            }
            , function (err) {
                alert('Error occurred!');
            }
        );
        $http.get($rootScope.serverAddDomain + $rootScope.serverPortDomain +"/myPortfolio/" + $rootScope.loginAccount.accId).then(function (response) {
            var stocks = response.data;
            for (var i = 0 ; i < stocks.length ; i++) {
                var stockTmp = {
                    stockName : stocks[i].stockName,
                    stockId : stocks[i].stockId,
                    currentWorth : stocks[i].currentWorth,
                    purchaseValue : stocks[i].purchaseValue,
                    amount : stocks[i].amount,
                    changeVal : (stocks[i].currentWorth - stocks[i].purchaseValue) / stocks[i].purchaseValue,
                    showCmd : false
                };
                $scope.stocks.push(stockTmp);
            }
        }, function (err) {
            alert("Error Occurred");
        });
        $scope.showForm = function (i) {
            if ($scope.stocks[i].showCmd) {
                $scope.stocks[i].showCmd = false;
            } else {
                $scope.stocks[i].showCmd = true;
            }
        }


    }]);