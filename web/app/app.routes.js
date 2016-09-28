/*jshint esversion: 6 */
((app) => {

    app.config(['$stateProvider',($stateProvider) => {
        $stateProvider.state({
            name: 'about',
            url: '/about',
            template: '<h3>Its the UI-Router hello world app!</h3>'
        });
    }]);



})(angular.module('app'));