/*global angular */

(function () {
    "use strict";


    angular.module("myApp.services", ['ngResource'])


        // service factory
        .factory('booksService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    dbBooks = {};
                //REST URL to server
                dbBooks.books = $resource('/api/books/:_id', {},  actions);
                return dbBooks;
            }])

    // service factory
    .factory('moviesService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                dbMovies = {};
            //REST URL to server
            dbMovies.movies = $resource('/api/movies/:_id', {},  actions);
            return dbMovies;
        }])

        .factory('moviesQueryService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'}
                    },
                    query = {};
                //REST URL to server
                query.results = $resource('/api/movies/query/:_searchString', {},  actions);
                return query;
            }])
        .factory('moviesQueryByIdService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'}
                    },
                    result = {};
                //REST URL to server
                result.movie = $resource('/api/movies/query/id/:_id', {},  actions);
                return result;
            }])
}());