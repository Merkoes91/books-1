/**
 * Created by Marko on 19-4-2016.
 */

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

var ActorController = require('../app/controllers/actors.js');

router.get( '/movies/actor/:_ActorId', ActorController.detailActor);

router.put('/movies/actor/:_ActorId');

module.exports = router;