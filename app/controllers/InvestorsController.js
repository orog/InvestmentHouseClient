/**
 * Created by Moshe on 10/06/2017.
 */
angular.module('myApp').controller('InvestorsController', ['$rootScope', '$http', '$scope'
    , function ($rootScope, $http, $scope) {
        $scope.investors = [];
        $scope.statuses = [{statusId: 1, statusName: "Pending"}, {
            statusId: 2,
            statusName: "Authorized"
        }];
        $scope.stockTmp = {
            stockName: "",
            stockId: "",
            purchaseValue: 0,
            currentWorth: 0,
            amount: 0,
            changeVal: 0
        };
        $scope.selectedStatus = null;

        $http.get($rootScope.serverAddDomain + $rootScope.serverPortDomain + '/myAccount/allInvestors/' + $rootScope.loginAccount.accId).then(
            function (response) {
                var investors = response.data;
                for (var i = 0; i < investors.length; i++) {
                    var investmentTmp = {
                        accName: investors[i].accName,
                        accId: investors[i].accId,
                        email: investors[i].email,
                        balance: investors[i].balance,
                        statusId: investors[i].statusId,
                        portfolioValue : null
                    };
                    $scope.investors.push(investmentTmp);
                }
            }
            , function (err) {
                alert('Error occurred!');
            }
        );
        $scope.getTotalWorth = function (index, accId) {
             $http.get($rootScope.serverAddDomain + $rootScope.serverPortDomain + '/myAccount/totalWorth/' + accId).then(
                function (worth) {
                    $scope.investors[index].portfolioValue = worth.data;
                }
                , function (err) {
                    alert('Error occurred!');
                }
            );

        };

        $scope.showPortfolioFunc = function (i) {
            if ($scope.investors[i].showPortfolio) {
                $scope.investors[i].showPortfolio = false;
            } else {
                $scope.investors[i].showPortfolio = true;
                $scope.getTotalWorth(i , $scope.investors[i].accId);
                $http.get($rootScope.serverAddDomain + $rootScope.serverPortDomain + '/myPortfolio/' + $scope.investors[i].accId).then(
                    function (response) {
                        var stocksTmp = response.data;
                        $scope.investors[i].stocks = [];
                        for (var j = 0; j < stocksTmp.length; j++) {
                            $scope.investors[i].stocks.push(stocksTmp[j]);
                            $scope.investors[i].stocks[j].changeVal = (stocksTmp[j].currentWorth - stocksTmp[j].purchaseValue) / stocksTmp[j].purchaseValue;

                        }
                    }, function (err) {
                        alert("Error Occurred!");
                    }
                )
            }
        };
        $scope.update = function (i, updatedBalance, selectedStatus) {
            var investorUpdate = {
                accId: $scope.investors[i].accId,
                statusId: null,
                balance: null
            };
            if (selectedStatus) {
                investorUpdate.statusId = selectedStatus;
            }
            if (updatedBalance) {
                investorUpdate.balance = updatedBalance;
            }
            $http.put($rootScope.serverAddDomain + $rootScope.serverPortDomain + '/myAccount/updateInvestorByBroker', investorUpdate).then(
                function (response) {
                    if (response.data) {
                        alert('investor updated');
                        if (updatedBalance != null) {
                            $scope.investors[i].balance = updatedBalance;
                        }
                        if (selectedStatus != null) {
                            $scope.investors[i].statusId = parseInt(selectedStatus);
                        }
                    } else {
                        alert('Error occurred!');
                    }
                }
                , function (err) {
                    alert('Error occurred!');
                }
            )
        }
    }
]);