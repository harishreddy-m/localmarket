/**
*angular main page
*
*/

var offeringsApp = angular.module('offeringsApp', ['ui.router','angularFileUpload','angular-growl','ui.grid']);

offeringsApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('vendors', {
            url: '/vendors',
            templateUrl: '/templates/partial-vendors.html'
        })
        .state('new', {
            url: '/new',
            templateUrl: '/templates/partial-vendors-add.html'
        })
        
        
});