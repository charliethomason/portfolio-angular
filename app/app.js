angular.module('charlie', [
    'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/'
        });
    $urlRouterProvider.otherwise('/');
});