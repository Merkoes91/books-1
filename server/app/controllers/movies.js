/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Movie = mongoose.model('Movie'),
    MovieDatabase = mongoose.model('MovieDatabase'),
    http = require('http'),
    fs = require('fs'),
    request = require('request'),
    rp = require('request-promise');


/**
 * CREATE a movie
 * --------------------
 * Controller to create a movie
 **/
exports.create = function (req, res) {
    var conditions = {imdbId: req.body.imdbId},
        fields = {},
        retObj,
        newMovie,
        movie;

    MovieDatabase
        .findOne(conditions,fields)
        .exec(function (err, doc) {
            console.log('1: Checking if ' + req.body.origTitle + ' already exists in local database');

            retObj = {
                doc: doc, // Array all documents
                err: err
            };

            movie = new Movie({
                imdbId: req.body.imdbId,
                title: req.body.origTitle
            });

            return res.send(retObj);
        }).then(function (){
            if(retObj.doc == null) {
                console.log('2: Movie not found adding to the local database');

                newMovie = new MovieDatabase(req.body);

                newMovie.save(function() {
                    request(newMovie.poster).pipe(fs.createWriteStream('./uploads/movieposters/' + newMovie.imdbId + '.jpg'));
                    request(newMovie.backdrop).pipe(fs.createWriteStream('./uploads/backdrops/' + newMovie.imdbId + '.jpg'));
                }).then(function() {
                   console.log('3: Movie added to the local database adding to the movie list');

                    movie.save().then(function (){
                        console.log('4: Succesully added movie to the movie list');
                    });
                });


            }
            else {
                console.log('2: Movie already exists in local database saving to the movie list');

                movie.save().then(function (){
                    console.log('3: Succesully added movie to the movie list');
                });
            }
        });
};


/*
* Controller to check if movie is in local movie database and create poster paths
*
*/

/**
 * RETRIEVE _all_ movies
 * --------------------
 * Controller to retrieve _all_ movies
 */
exports.list = function (req, res) {
    var conditions,
        fields,
        sort;

    conditions = {};
    fields = {};
    sort = {'modificationDate': -1};

    Movie
        .find(conditions, fields)
        .sort(sort)
        .exec(function (err, doc) {

            var retObj = {
                meta: {"action": "list",
                    'timestamp': new Date(),
                    filename: __filename},
                doc: doc, // Array all documents
                err: err
            };

            return res.send(retObj);
        });
};

/**
 * RETRIEVE _one_ movies
 * --------------------
 * Controller to retrieve _one_ movies
 */

exports.detail = function (req, res) {
    var conditions,
        fields;

    conditions = {imdbId: req.params.imdbId};
    fields = {};

    MovieDatabase
        .findOne(conditions, fields)
        .exec(function (err, doc) {
           res.send(doc);
        });
};

/**
 * DELETE
 * remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
 * @param req
 * @param res
 */

/**
 * DELETE _one_ book
 * --------------------
 * Controller to delete _one_ books.
 */

exports.delete = function (req, res) {
    var conditions,
        callback;
    conditions = {imdbId: req.params.imdbId};
    callback = function (err, doc) {

        var retObj = {
            meta: {"action": "delete",
                'timestamp': new Date(),
                filename: __filename},
            doc: doc, // Only ONE object
            err: err
        };
        return res.send(retObj);
    };

    Movie.findOneAndRemove(conditions, callback);
};

exports.posterImage = function (req, res) {
    var imageDir =  __dirname + '../../../uploads/movieposters/';
    var image = req.params._imdbId + '.jpg';

    fs.readFile(imageDir + image, function(err, data) {
        if (err) throw err; // Fail if the file can't be read.

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
    });
};

exports.backDrop = function (req, res) {
    var imageDir =  __dirname + '../../../uploads/backdrops/';
    var image = req.params._imdbId + '.jpg';


    fs.readFile(imageDir + image, function(err, data) {
        if (err) throw err; // Fail if the file can't be read.

        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); // Send the file data to the browser.
    });
};