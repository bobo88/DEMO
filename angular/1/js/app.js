angular.module('klwkData',[
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ngTouch'
]).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/login',{
            url: '/login',
            templateUrl:'./template/login.html',
            controller: "loginController"
        })
        .when('/',{
            url: '/',
            templateUrl:'./template/groupDaily.html',
            controller: "groupDailyController"
        })
        .otherwise({redirectTo:'/login'});

}]);