/*jslint node: true */
/*globals myApp */

myApp.controller('parentCtrl', function ($scope) {
    "use strict";
    $scope.text = 'this is the parent controller';
});

function MovieListCtrl($scope, moviesService) {
    "use strict";
    //get all movies
    $scope.movies = moviesService.movies.get();
}

function MovieDetailCTRL($scope, $routeParams, $location, moviesService) {
    "use strict";

    // GET 1 movie
    if ($routeParams.id !== 0) {
        $scope.movies = moviesService.movies.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }


    // DELETE movie
    $scope.deleteMovie = function () {
        moviesService.books.delete({_id: $routeParams._id});
        console.log('deleting');
        $location.path("/books");
    };

    // CREATE, UPDATE movie
    $scope.saveMovie = function () {
        if ($scope.movies.doc && $scope.movies.doc._id !== undefined) {
            console.log('Entering movie update');
            moviesService.movies.update({_id: $scope.movies.doc._id}, $scope.movies, function (res) {
                console.log(res);
            });
            $location.path("/movies");

        } else {
            console.log('Entering movie save');
            moviesService.movies.save($scope.movies.doc, function (res) {
                console.log(res);
            });
            $location.path("/movies");
        }
    };


}

function BookListCtrl($scope, booksService) {
    "use strict";
    //get all books
    $scope.books = booksService.books.get();
}

function BookDetailCtrl($scope, $routeParams, $location, $http, booksService) {
    "use strict";

       $scope.getBookData = function (isbn) {

        var url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (data) {
            $scope.books.doc = new Object();
            $scope.books.doc.imageURL = data['ISBN:' + isbn]['cover']['large'];
            $scope.books.doc.title = data['ISBN:' + isbn]['title'];
            $scope.books.doc.author = data['ISBN:' + isbn]['authors'][0]['name'];
        }).error(function (err) {
            console.log(err);
        });
    };


    // GET 1 book
    if ($routeParams.id !== 0) {
        $scope.books = booksService.books.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }


    // DELETE book
    $scope.deleteBook = function () {
        booksService.books.delete({_id: $routeParams._id});
        console.log('deleting');
        $location.path("/books");
    };

    // CREATE, UPDATE book
    $scope.saveBook = function () {
        if ($scope.books.doc && $scope.books.doc._id !== undefined) {
            console.log('Entering update');
            booksService.books.update({_id: $scope.books.doc._id}, $scope.books, function (res) {
                console.log(res);
            });
            $location.path("/books");

        } else {
            console.log('Entering save');
            console.log($scope.books.doc);
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