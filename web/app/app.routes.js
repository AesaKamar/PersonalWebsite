/*jshint esversion: 6 */
((app) => {

    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

        //Default State
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'contact': { templateUrl: '../index/contact/contact.view.html' }
                }
            });
    }]);



})(angular.module('app'));