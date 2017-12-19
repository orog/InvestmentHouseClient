// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: 'templates/login.html'
        })
        .when('/login', {
            templateUrl: 'templates/login.html'
        })
        .when('/register', {
            templateUrl: 'templates/register.html'
        })
        .when('/account', {
            templateUrl: 'templates/accountDetails.html'
        })
        .when('/account/portfolio', {
            templateUrl: 'templates/portfolio.html'
        })
        .when('/account/stockMarket', {
            templateUrl: 'templates/stockMarket.html'
        })
        .when('/account/Commands', {
            templateUrl: 'templates/Commands.html'
        })
        .when('/account/updateDetails', {

            templateUrl: 'templates/accountDetails.html'
        })
        .when('/broker', {
            templateUrl: 'templates/SystemData.html'
        })
        .when('/broker/systemData', {
            templateUrl: 'templates/SystemData.html'
        })
        .when('/broker/investors', {
            templateUrl: 'templates/Investors.html'
        })
        .when('/logOut', {
        template: '',
        controller: 'LogoutController'
    })
        .otherwise({redirectTo: '/login'});
}])
    .run(function ($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if ($rootScope.logedIn == null || $rootScope.logedIn == false) {
                // no logged user, redirect to /login
                if (next.templateUrl === 'templates/login.html' || next.templateUrl === 'templates/register.html') {
                } else {
                    $location.path("/login");
                }
            }
        })
    });