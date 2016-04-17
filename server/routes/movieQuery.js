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

router.get('/movies/query/:_searchString', MovieQueryController.list)
       .get('/movies/query/id/:_id', MovieQueryController.detail)
        .get('/movies/config', MovieQueryController.config);
module.exports = router;