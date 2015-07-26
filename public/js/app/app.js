/**
*angular main page
*
*/

var offeringsApp = angular.module('offeringsApp', ['ui.router','angular-loading-bar','ui.grid.exporter','ui.grid.edit','720kb.datepicker','angularFileUpload','angular-growl','ui.grid','ui.grid.resizeColumns', 'ui.grid.selection','ngFileUpload','ngDialog','ngUnderscore']);

offeringsApp.config(function($stateProvider, $urlRouterProvider,ngDialogProvider) {

  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default',
    showClose: true,
    closeByDocument: true,
    closeByEscape: true
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home',{url:'/',template:"<div ui-view></div>"});

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
        })
        .state('home.admin.bulkvendors', {
          url: '/bulk',
          templateUrl: '/templates/partial-vendors-import.html'
        })
        .state('home.admin.items', {
          url: '/items',
          templateUrl: '/templates/partial-items.html',
          controller:'itemController'
        });

        $stateProvider.state('home.customer',{
          url:'customer',
          template:'<div ui-view></div>'
        }).state('home.customer.profile',{
          url:'/profile',
          templateUrl : '/templates/customers-profile.html'
        }).state('home.customer.display',{
          url:'/display',
          resolve:{
             promiseData : function($http){
             return $http.get('/customer/items').then(function(response){
              return response.data; 
            });
           }
         },
           templateUrl : '/templates/customers-list.html',
           controller: 'displayController'
         });

      }); 

offeringsApp.run(['$rootScope', '$state', 'Authentication', function($rootScope, $state, Authentication) {
  $rootScope.$on('$stateChangeStart', function(e, to) {
    var role;
    Authentication.isAdmin().then(function(response){
      var role = response.data;
      if (to.name.indexOf('admin') >=0 && role !== 'admin') {
        e.preventDefault();
      }else if (to.name.indexOf('customer') >=0 && role !== 'customer') {
        e.preventDefault();
      }else{
        if(to.name=='home'&&role=='admin')
          $state.go('home.'+role);
        else if((to.name=='home' || to.name == 'home.customer') &&role=='customer')
          $state.go('home.customer.display');
      }

    });
  });
}]);


