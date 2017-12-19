/**
 * Created by orgivati on 11/06/2017.
 */
angular.module('myApp').controller('stockMarketViewController', ['$scope' , '$http' , '$rootScope' ,
    function ($scope,$http,$rootScope) {
        $scope.stocks = [];

        $http.get($rootScope.serverAddDomain  + $rootScope.serverPortDomain +'/stocks').then(
            function (response) {
                var stocksTmp = response.data;
                for(var i = 0 ; i < stocksTmp.length; i++){
                    var stockTmp = {
                        stockId : stocksTmp[i].stockId,
                        stockName : stocksTmp[i].stockName,
                        actualWorth : stocksTmp[i].actualWorth,
                        showCmd : false
                    }
                    $scope.stocks.push(stockTmp);
                }
        }, function (err) {
            alert("Error Occurred!")
        })
        $scope.showForm = function (i) {
            if($scope.stocks[i].showCmd){
                $scope.stocks[i].showCmd = false;
            }else {
                $scope.stocks[i].showCmd = true;
            }
        };
        /*test
        $scope.stocks =[ {
            stockName : 'google' ,
            stockId : 'goog',
            purchaseValue : 44 ,
            currentValue : 58 ,
            amount : 4 ,
            change : 0,
            showCmd : false
        },
            {
                stockName : 'google' ,
                stockId : 'goog',
                purchaseValue : 11 ,
                currentValue : 58 ,
                amount : 4 ,
                change : 0,
                showCmd : false
            },
            {
                stockName : 'google' ,
                stockId : 'goog',
                purchaseValue : 88 ,
                currentValue : 58 ,
                amount : 4 ,
                change : 0,
                showCmd : false
            },
            {
                stockName : 'google' ,
                stockId : 'goog',
                purchaseValue : 33 ,
                currentValue : 58 ,
                amount : 4 ,
                change : 0,
                showCmd : false
            }]
            test
            */
    }]);