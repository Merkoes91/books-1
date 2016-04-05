/*jslint node: true */
/*globals myApp */

function BookListCtrl($scope, booksService) {
    "use strict";
    //get all books
    $scope.books = booksService.books.get();
}

function BookDetailCtrl($scope, $routeParams, $location, booksService) {
    "use strict";


    // GET 1 book
    if ($routeParams.id !== 0) {
        $scope.books = booksService.books.get({_id: $routeParams.id}, function () {
            console.log('$scope.requests ', $scope.requests);
            $scope.status = 'Editing ';
        });
    }

    if ($routeParams.id == 'new') {
        $scope.status = 'Adding new book' ;
    }

    // DELETE book
    $scope.removeOne = function () {
        booksService.books.delete({_id: $routeParams.id});
        console.log('deleting');
        $location.path("/books");
    };

    // CREATE, UPDATE book

    // CREATE, UPDATE book
    $scope.save = function () {

        if ($scope.books.doc && $scope.books.doc._id !== undefined) {
            console.log('Entering update');
            booksService.books.update({_id: $scope.books.doc._id}, $scope.books, function (res) {
                console.log(res);
            });
            $location.path("/books");

        } else {
            console.log('Entering save');
            booksService.books.save({}, $scope.books.doc, function (res) {
                console.log(res);
            });
            $location.path("/books");
        }
    };
}

myApp.controller('myCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
});