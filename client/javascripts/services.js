/*global angular */

/*global angular */

(function () {
    "use strict";

    angular.module('myApp')
        .service('APIInterceptor', function($q, $rootScope, $log, $location, $window) {
            var service = this;
            service.request = function(config) {
                $log.debug("service.request:Show Spinner");

                if (config.url.indexOf('.html') < 0) {
                    // for hide spinner in background service calls
                    ($rootScope.bgHideSpinner) ? ($rootScope.showSpinner = true) : ($rootScope.bgHideSpinner = true);
                }

                //$log.debug(config);
                return config;
            };
            service.requestError = function(config) {
                $log.debug("service.requestError:Show Spinner");
                $rootScope.showSpinner = true;
                //$log.debug(config);
                return config;
            };
            service.response = function(response) {
                $log.debug("service.response:Hide Spinner");
                if (response.config.url.indexOf('.html') < 0) {
                    $rootScope.showSpinner = false;
                }
                //$log.debug(response);
                return response;
            };
            service.responseError = function(response) {
                $log.debug("service.responseError:Hide Spinner");
                $rootScope.showSpinner = false;
                return $q.reject(response); /* without this reject the error goes into success handler */
            }});

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
}());