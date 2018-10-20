var app = angular.module('myApp',['ui.router']);

app.config(function ($stateProvider,$locationProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: "loginC"
    }).state('home',{
        url:'/home',
        templateUrl:'home.html',
        controller:'homeC'
    });
    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);

});