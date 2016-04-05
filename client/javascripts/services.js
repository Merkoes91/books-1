/*global angular */

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
                    db = {};
                //REST URL to server
                db.books = $resource('/api/books/:_id', {},  actions);
                return db;
            }]);
}());