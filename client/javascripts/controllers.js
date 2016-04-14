/*jslint node: true */
/*globals myApp */
String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};


myApp.controller('mediaItemCtrl', function ($scope) {
    // Collapse directive from angular-bootstrap
    $scope.isCollapsed = !$scope.isCollapsed;

    $scope.collapse = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
        console.log($scope.isCollapsed);
    };
});

myApp.controller('MovieListCtrl', function ($scope, $uibModal, $log, moviesService) {
    "use strict";
    //get all movies
    $scope.movies = moviesService.movies.get();

    //enable animations for modal from angular-bootstrap
    $scope.animationsEnabled = true;

    // open modal angular-bootstrap
    $scope.open = function (size, movie) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: './partials/movie-detail.html',
            controller: 'MovieDetailCtrl',
            size: size,
            resolve: {
                movie: function () {
                    return movie;
                }
            }
        });

       modalInstance.result.then(function () {
           $scope.movies = moviesService.movies.get();
        });
    };
});

myApp.controller('MovieDetailCtrl', function ($rootScope, $scope, $http, $location, $uibModalInstance, movie, moviesService) {
    "use strict";

    $scope.editOrAdd = 'Add a movie';
    if(movie) { $scope.editOrAdd = 'Edit this movie'; }

    $scope.movie = movie;


    $scope.bindResult = function(result) {
        $scope.movie = {};

        $scope.movie.title = result['Title'];
        $scope.movie.year = result['Year'];
        $scope.movie.imdbUrl = "http://www.imdb.com/title/" + result['imdbID'];
        $scope.movie.poster = result['Poster'];
        console.log($scope.movie);
        $scope.searchResults = "";
    };


    $scope.queryMovie = function(querySearchString) {
        querySearchString = querySearchString.replaceAll(" ", "+");
        console.log('fetching data from: http://www.omdbapi.com/?s=' + querySearchString + '&type=movie');

        var url = 'http://www.omdbapi.com/?s=' + querySearchString + '&type=movie';

        $http.get(url).then(function (response) {
            $scope.totalResults = response['data']['totalResults'];
            $scope.searchResults = response['data']['Search'];
        }, function (error) {
            console.log(error);
        });
    };

    // DELETE movie
    $scope.deleteMovie = function () {
        moviesService.movies.delete({_id: $scope.movie._id});
        console.log('deleting');
         $uibModalInstance.close(movie);
         $location.path('/movies');
    };

    // CREATE, UPDATE movie
    $scope.saveMovie = function () {
        if ($scope.editOrAdd == 'Edit this movie') {
            console.log('Entering movie update');
            console.log(movie);
            moviesService.movies.update({_id: $scope.movie._id}, $scope.movie, function (res) {
                console.log(res);
            });
            $uibModalInstance.close(movie);
            $location.path('/movies');

        } else {
            console.log('Entering movie save');
            moviesService.movies.save($scope.movie, function (res) {
                console.log(res);
            });
            $uibModalInstance.close(movie);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});



myApp.controller('BookListCtrl', function ($scope, booksService) {
    "use strict";
    //get all books
    $scope.books = booksService.books.get();
});

myApp.controller('BookDetailCtrl', function ($scope, $routeParams, $location, $http, booksService) {
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
});


myApp.controller('myCtrl', function ($scope) {
    "use strict";
    $scope.firstName = "Marko";
    $scope.lastName = "de Roos";
    $scope.position = 'Student';
    $scope.picture = "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xtp1/v/t1.0-9/1422382_10204072021618271_4851143020002677795_n.jpg?oh=9c816c78eebe3a24f3a3e030e4906252&oe=57730180&__gda__=1471914662_2f5e118666ce64044f9d73b5928fa59b";
    $scope.aboutMe = "Hi, my name is Marko de Roos, Currently 24 years of age and residing in Ede, Netherlands.  This is an assignment for school Learning about the MEAN STACK.";
});

