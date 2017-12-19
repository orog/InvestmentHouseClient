/**
 * Created by orgivati on 03/06/2017.
 */
angular.module('myApp')
    .controller('registerController' , ['$http' , '$location' , '$scope' , '$rootScope' ,
    function ($http,$location,$scope , $rootScope) {
        $scope.err = "";
        $scope.newAccount = {
            accName : "" ,
            email : "" ,
            password : "",
            status : "",
            balance : -1
        }
        $scope.createAccount = function(newAccount) {
            $scope.err = "";
            if (!newAccount) return;
            if(newAccount.accName.length == 0 || newAccount.email == null|| newAccount.password.length == 0){
                $scope.err = "Wrong input!"
                return;
            }
            $http({
                method: 'put',
                url: $rootScope.serverAddDomain + $rootScope.serverPortDomain +'/register/register',
                data: newAccount
            })
                .then(function(reponse){
                        if(reponse.data) {
                            alert("Created");
                            $location.url('/')
                        }else
                            alert("Error");
                    },
                    function(errMsg){
                        console.log(errMsg);
                    })
        }
    }])