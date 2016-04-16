/**
 * Created by Marko on 8-4-2016.
 */

/* jslint node: true */



/** @module Routes for movies */
/** @class */

var express = require('express');
var router = express.Router();

/**  movies routes
 ---------------
 We create a variable "user" that holds the controller object.
 We map the URL to a method in the created variable "controller".
 In this example is a mapping for every CRUD action.
 */

var MovieQueryController = require('../app/controllers/movieQueries.js');

// CREATE
/** CREATE route for books */


// RETRIEVE ALL or 1 books (document)
router.get('/movies/query/:_searchString', MovieQueryController.queryFunction);



module.exports = router;