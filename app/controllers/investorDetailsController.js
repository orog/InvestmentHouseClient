/**
 * Created by orgivati on 10/06/2017.
 */
angular.module("myApp").controller("investorDetailsController" , [ '$scope' , '$http' , '$rootScope' , '$location',
    function ($scope ,$http , $rootScope , $location) {
        if(!$rootScope.logedIn){
            $location.url('#!/login');
        }
        $scope.updated = {
            accName : "" ,
            email : "" ,
            password : ""
        };
        $scope.accInfo = {
            balance : -1,
            accountStatus : ""
        };
        $http.get( $rootScope.serverAddDomain  + $rootScope.serverPortDomain + "/myAccount/details/" + $rootScope.loginAccount.accId).then(function (account) {
            $scope.accInfo.balance = account.data.balance;
            $scope.accInfo.accountStatus = account.data.statusId;
            if(account.data.statusId === 1){
                $scope.accInfo.accountStatus = "Pending";
            }else {
                $scope.accInfo.accountStatus = "Authorized";
            }
        }, function (err) {
            alert("Reload the page!");
        });
        $scope.updateDetails = function (updated) {
            $scope.infoToUpdate = {
                accId : $rootScope.loginAccount.accId ,
                //add parameters
                email : updated.email ,
                accName : updated.accName ,
                password : updated.password
            };

            $http.put($rootScope.serverAddDomain  + $rootScope.serverPortDomain +"/myAccount/updateDetails" , $scope.infoToUpdate ).then(function (response) {
                if(response.data){
                    alert("Details Updated!");
                    if(updated.accName != null || updated.accName.length != 0)
                        $rootScope.loginAccount.accName = updated.accName;
                    if(updated.email != null || updated.email.length != 0)
                        $rootScope.loginAccount.email = updated.email;
                }else{
                    alert("Wrong Input!")
                }
            } , function (err) {
                alert("Error occurred!")
            })

        }
    }] );