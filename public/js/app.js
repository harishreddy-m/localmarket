/**
*angular main page
*
*/

var offeringsApp = angular.module('offeringsApp', ['ui.router']);

offeringsApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('vendors', {
            url: '/vendors',
            templateUrl: '/templates/partial-vendors.html'
        })
        
        
});