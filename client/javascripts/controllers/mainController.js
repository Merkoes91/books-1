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

myApp.controller('MovieListCtrl', function ($scope, $uibModal, $log, moviesService) {
    "use strict";
    //get all movies
    moviesService.movies.get().$promise.then( function (res) {
        $scope.movies = res;
        console.log(res);
    }, function(err) {
        console.log('Error:' + err);
    });

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
            moviesService.movies.get().$promise.then (function (res) {
                $scope.movies = res;
            });
        });
    };
});



myApp.controller('MovieDetailCtrl', function ($scope, $location,$http, $uibModal, $uibModalInstance, movie, moviesService, moviesQueryService, moviesQueryByIdService, actorInfoService) {
    "use strict";
    $scope.imdbBtn = 'data:image/png;base64,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';
    $scope.websiteBtn= 'data:image/png;base64,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';
    $scope.editOrAdd =  'Add a movie';
    var lastMovie = {};

    if(movie) {
        $scope.editOrAdd =  movie.origTitle,
        $scope.movie = movie,
        $scope.movie['credits'].splice(5, $scope.movie['credits'].length);
    }

    $scope.bindResult = function(id) {
        moviesQueryByIdService.movie.get({_id: id}).$promise.then(function (res) {
            $scope.movie  = {
                "backdrop": 'http://image.tmdb.org/t/p/w1280/' + res['backdrop_path'],
                "genres": res['genres'],
                "homepage": res['homepage'],
                "imdbId": res['imdb_id'],
                "origLang": res['original_language'],
                "origTitle": res['original_title'],
                "plot": res['overview'],
                "poster": 'http://image.tmdb.org/t/p/w780/' + res['poster_path'],
                "prodCompanies": res['production_companies'],
                "prodCountries": res['production_countries'],
                "releaseDate": Date(res['release_date']),
                "releaseStatus": res['status'],
                "credits": res['credits']['cast']
                };
            $scope.saveMovie($scope.movie);
        }, function (err) {
            console.log(err);
        })
    };


    $scope.queryMovie = function(querySearchString) {
        querySearchString = querySearchString.replaceAll(" ", "+");
        moviesQueryService.results.get({_searchString: querySearchString}).$promise.then(function (res) {
            $scope.results = res.results;
        }, function (err) {
            console.log (err);
        });
    };

    // DELETE movie
    $scope.deleteMovie = function () {
        moviesService.movies.delete({_id: $scope.movie._id});
        console.log('deleting');
         $uibModalInstance.close(movie);
    };

    // CREATE, UPDATE movie
    $scope.saveMovie = function (movie) {
            console.log('saving movie');
            moviesService.movies.save(movie).$promise.then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
            $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss()
    };

    $scope.findActor = function (id) {
        lastMovie = $scope.movie;
        delete $scope.movie;

        actorInfoService.info.get({_id: id}).$promise.then(function (res) {
            $scope.actor = res;
            $scope.editOrAdd = $scope.actor.name;
        }, function (error) {
            console.log(err);
        });
    };

    $scope.backToMovie = function () {
        $scope.movie = lastMovie;

        $scope.editOrAdd = $scope.movie.origTitle;
        delete $scope.actor;
    }
});

myApp.controller('BookListCtrl', function ($scope, booksService) {
    "use strict";
    //get all books
    $scope.books = booksService.books.get();
});

myApp   .controller('BookDetailCtrl', function ($scope, $routeParams, $location, $http, booksService) {
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

