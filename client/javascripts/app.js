/*global angular, BookListCtrl, BookDetailCtrl */


/**
 * @see http://docs.angularjs.org/guide/concepts
 */

var myApp = angular.module('myApp', ['myApp.services', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        $routeProvider.when('/about', {
            templateUrl: './partials/about.html'
        });

        $routeProvider.when('/books', {
            templateUrl: './partials/book-list.html',
            controller: BookListCtrl
        });

        // Operations on 1 book
        $routeProvider.when('/books/:_id', {
            templateUrl: './partials/book-detail.html',
            controller: BookDetailCtrl
        });


        $routeProvider.when('/movies', {
            templateUrl: './partials/movie-list.html',
            controller: MovieListCtrl
        });

        $routeProvider.when('/movies/:_id', {
            templateUrl: './partials/movie-detail.html',
            controller: MovieDetailCTRL
        });

        // otherwise
    }]);