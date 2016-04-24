/*global angular, BookListCtrl, BookDetailCtrl */


/**
 * @see http://docs.angularjs.org/guide/concepts
 */

var myApp = angular.module('myApp', ['myApp.services', 'ngRoute', 'ngTouch', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        $routeProvider.when('/about', {
            templateUrl: './partials/about.html'
        });

        $routeProvider.when('/movies', {
            templateUrl: './partials/movie-list.html',

        });

        $routeProvider.otherwise({
                redirectTo: "/movies"
        })
        // otherwise
    }]);








