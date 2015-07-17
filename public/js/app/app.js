/**
*angular main page
*
*/

var offeringsApp = angular.module('offeringsApp', ['ui.router','angularFileUpload','angular-growl','ui.grid','ui.grid.resizeColumns', 'ui.grid.selection']);

offeringsApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('home',{url:'/',resolve:{ promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '/user/role'});
         }},template:"<div ui-view></div>",controller:function($scope, promiseObj,$state){
          $scope.isAdmin = promiseObj.data;
          if(promiseObj.data=='admin')
            $state.go('home.admin');
          else if(promiseObj.data=='customer')
            $state.go('home.customer');

      }});
        
        // HOME STATES AND NESTED VIEWS ========================================
       $stateProvider.state('home.admin',{
            url:'admin',
            templateUrl:'/templates/admin-home.html'
        })
        .state('home.admin.vendors', {
            url: '/vendors',
            templateUrl: '/templates/partial-vendors.html'
        })
        .state('home.admin.new', {
            url: '/new',
            templateUrl: '/templates/partial-vendors-add.html'
        });

    $stateProvider.state('home.customer',{
        url:'customer/:name',
        templateUrl:'/templates/customers-home.html',
        controller:'customerController'
    });

        
        
});