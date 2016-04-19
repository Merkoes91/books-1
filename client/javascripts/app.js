/*global angular, BookListCtrl, BookDetailCtrl */


/**
 * @see http://docs.angularjs.org/guide/concepts
 */

var myApp = angular.module('myApp', ['myApp.services', 'ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        $routeProvider.when('/about', {
            templateUrl: './partials/about.html'
        });

        $routeProvider.when('/books', {
            templateUrl: './partials/book-list.html',

        });

        // Operations on 1 book
        $routeProvider.when('/books/:_id', {
            templateUrl: './partials/book-detail.html',

        });


        $routeProvider.when('/movies', {
            templateUrl: './partials/movie-list.html',

        });
        // otherwise
    }]);






