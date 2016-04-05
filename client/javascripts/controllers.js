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
        $scope.books = booksService.books.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }


    // DELETE book
    $scope.delete= function () {
        booksService.books.delete({_id: $routeParams._id});
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
            booksService.books.save($scope.books.doc, function (res) {
                console.log(res);
            });
            $location.path("/books");
        }
    };
}

myApp.controller('myCtrl', function ($scope) {
    "use strict";
    $scope.firstName = "Marko";
    $scope.lastName = "de Roos";
    $scope.position = 'Student';
    $scope.picture = "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xtp1/v/t1.0-9/1422382_10204072021618271_4851143020002677795_n.jpg?oh=9c816c78eebe3a24f3a3e030e4906252&oe=57730180&__gda__=1471914662_2f5e118666ce64044f9d73b5928fa59b";
    $scope.aboutMe = "Hi, my name is Marko de Roos, Currently 24 years of age and residing in Ede, Netherlands.  This is an assignment for school Learning about the MEAN STACK.";
});