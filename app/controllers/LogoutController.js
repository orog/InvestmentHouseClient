/**
 * Created by orgivati on 12/06/2017.
 */
angular.module('myApp').controller('LogoutController' , ['$rootScope', '$location' ,
    function ($rootScope, $location) {
        $rootScope.logedIn = false;
        $rootScope.loginAccount = null;
        $location.url('#!/');
    }
])