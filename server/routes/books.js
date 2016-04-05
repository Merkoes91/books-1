/** TODO: Test with static-analyzer */

/** @module Routes for books */
/** @class */
var express = require('express'),
    router = express.Router();

    /**  book routes
     ---------------
     We create a variable "user" that holds the controller object.
     We map the URL to a method in the created variable "controller".
     In this example is a mapping for every CRUD action.
     */
    var controller = require('../app/controllers/books.js');

    // CREATE
    /** CREATE route for books */
    router
        .post('/books', controller.create)


    // RETRIEVE
        .get('/books', controller.list);

    /** TODO: Define route for RETRIEVE 1 document */

    // UPDATE
    /** TODO: Define route for UPDATE 1 document */

    // DELETE
    /** TODO: Define route for DELETE 1 document */

