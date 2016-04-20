
/**
 * Created by Marko on 20-4-2016.
 */

var express = require('express');
var router = express.Router();


/* Controllers */
var BookController = require('../app/controllers/books.js'),
    MovieController = require('../app/controllers/movies.js'),
    ActorController = require('../app/controllers/actors.js'),
    MovieQueryController = require('../app/controllers/movieQueries.js');


/* MovieQueryRoutes */
router.get('/movies/query/:_searchString', MovieQueryController.list)
    .get('/movies/query/id/:_id', MovieQueryController.detail)
    .get('/movies/config', MovieQueryController.config);

/* Movie Routes */
// CREATE a movie
router.post('/movies', MovieController.create);

router.get('/movies', MovieController.list) // create a movie in mongo and upload the poster and backdrop to uploads
    .get('/movies/:_id', MovieController.detail)  // get movie information
    .get('/uploads/moviesposters/:_imdbId', MovieController.posterImage) // respond img from uploads folder
    .get('/uploads/backdrops/:_imdbId', MovieController.backDrop);

// DELETE a movie
router.delete('/movies/:_id', MovieController.delete);


/* Actor Routes */
// Get actor information from local mongo if available else it will use themoviedb.org API
router.get( '/movies/actor/:_ActorId', ActorController.detailActor);
// Save an actor to the local mongoDB
router.put('/movies/actor/:_ActorId');


/* Book routes */
// CREATE
router.post('/books', BookController.create);

// RETRIEVE ALL or 1 books (document)
router.get('/books', BookController.list).
    get('/books/:_id', BookController.detail);

// UPDATE
router.put('/books/:_id', BookController.updateOne);

// DELETE
router.delete('/books/:_id', BookController.delete);



/* Login Routes */
module.exports = router;