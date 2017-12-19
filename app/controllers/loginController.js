/**
 * Created by orgivati on 03/06/2017.
 */
angular.module("myApp")
    .controller("loginController", ['$scope', '$rootScope', '$http', '$location'
        , function ($scope, $rootScope, $http, $location) {
            /*test!*/
            //$rootScope.logedIn = true;
            // $rootScope.loginAccount = {
            //     email: "or.givati@gmail.com",
            //     name: "or",
            //     id: 4,
            //     accountType: '2'
            // }
            // /*test*/
            $rootScope.serverAddDomain = 'http://localhost:';
            $rootScope.serverPortDomain = '9090';
            if (!$rootScope.logedIn) {
                $rootScope.loginAccount = {
                    email: "",
                    accName: "",
                    accId: -1,
                    accountType: -1,
                    accountStatus : -1
                }
            } else {
                $location.url('#!/account');
            }
            $scope.err = "";
            $scope.login = function (log) {
                if (!log) return;
                $scope.err = "";
                if (log.email === null || log.password.length === 0) {
                    $scope.err = "Wrong input!";
                    return;
                }

                /*
                 tell me if accoout and password are valid. data sent is json { email , password }
                 -->expected response is json { valid : boolean , id : accountId ,name,type }
                 */
                $http({
                    method: 'post',
                    url: $rootScope.serverAddDomain + $rootScope.serverPortDomain + '/login',
                    data: log
                })
                    .then(function (response) {
                            var result = response.data;

                            if (result.valid) {
                                /*
                                 -->expected response is json { id , email , name , accountType: broker or investor }
                                 */
                                $rootScope.loginAccount.accId = result.accId;
                                $rootScope.loginAccount.accName = result.accName;
                                $rootScope.loginAccount.accountType = result.accountType;
                                $rootScope.loginAccount.email = log.email;
                                $rootScope.loginAccount.accountStatus = result.accountStatus;
                                $rootScope.logedIn = true;
                                if($rootScope.loginAccount.accountType === 1) {
                                    $location.url('/account');
                                }else{
                                    $location.url('/broker');
                                }
                            } else {
                                if (result.accountStatus === 1) {
                                    $scope.err = "Account is still pending!"
                                } else {
                                    $scope.err = "email or password not valid";
                                }
                                $rootScope.logedIn = false;
                            }
                        },
                        function (error) {
                            $rootScope.logedIn = false;
                            alert("an error has occurred");
                        })
            }

        }]);