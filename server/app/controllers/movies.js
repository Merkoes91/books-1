/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Movie = mongoose.model('Movie'),
    MovieDatabase = mongoose.model('MovieDatabase'),
    http = require('http'),
    fs = require('fs');

/**
 * CREATE a movie
 * --------------------
 * Controller to create a movie
 **/

exports.create = function (req, res) {
    var query,
        doc,
        movieToAdd,
        newMovie,
        promise,

    // check if exists in local MovieDatabase

    query = MovieDatabase.findOne({imdbId: req.body.imdbId});

    promise = query.exec();

    promise.then(function (res) {
        console.log(res);

        // movie is in local DB
        if(res != null) {
            res = res.toObject();
            delete res._id;
            delete res._v;

            doc = new Movie({imdbId: res.imdbId});
            doc.save(res, function (err) {
                if (err) {console.log(err); }
            });
            console.log('movie fetched from local DB');
        } else {
            // movie not in local DB fetch from themoviedb.org and save to local movieDB and movies
            console.log('Movie doesnt exist yet');
            var imdbId = {imdbId: req.body.imdbId};

            doc = new Movie(imdbId);
            newMovie = new MovieDatabase(req.body);

            newMovie.save(function (err) {
               if(!err) console.log('and saved it to the local database');
            });

            var download = function(url, dest, cb) {
                var file = fs.createWriteStream(dest);
                var request = http.get(url, function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                        file.close(cb);  // close() is async, call cb after close completes.
                    });
                });
            };

            if(newMovie.poster != null) {
                download(newMovie.poster, './uploads/movieposters/' + newMovie.imdbId + '.jpg', function() {
                    console.log('succesfully uploaded poster');
                });
            }

            if(newMovie.backdrop != null) {
                download(newMovie.backdrop, './uploads/backdrops/' + newMovie.imdbId + '.jpg', function() {
                    console.log('succesfully uploaded backdrop');
                });
            }

            doc.save(function (err) {
                if (!err) console.log('Movie not in local db, succesfully added movie from the moviedb.org');
            });
        }
    }, function(err) {
        if (err) {console.log(err); }
    });
};

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