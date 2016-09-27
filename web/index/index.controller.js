/*jshint esversion: 6 */
((app) => {

    /**
     * Initialize controller
     */
    app.controller('IndexController', [function IndexController() {
        let vm = this;

        vm.LeftNavButtons = [
            { icon: "contact_mail" },
            { icon: "code" },
            { icon: "dashboard" },
            { icon: "thumb_up" },

        ];

        vm.Tiles = [{
                title: "Woah",
                span: {
                    row: 5,
                    col: 5
                }
            },
            {}
        ]

    }]);


    /**
     * Do more stuff
     */



})(angular.module('app'));