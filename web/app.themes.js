((app) => {
    app.config(function($mdThemingProvider) {

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('pink').dark()
            .accentPalette('orange').dark();

    });
})(angular.module('app'))