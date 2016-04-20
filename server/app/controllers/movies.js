/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Movie = mongoose.model('Movie'),
    http = require('http'),
    fs = require('fs');

/**
 * CREATE a movie
 * --------------------
 * Controller to create a movie
 **/

exports.create = function (req, res) {
    var doc = new Movie(req.body);
    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create",
                'timestamp': new Date(),
                filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);
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

    if(doc.poster != null) {
        download(doc.poster, './uploads/movieposters/' + doc.imdbId + '.jpg', function(res) {
            console.log('succesfully uploaded poster');
        });
    }

    if(doc.backdrop != null) {
        download(doc.backdrop, './uploads/backdrops/' + doc.imdbId + '.jpg', function(res) {
            console.log('succesfully uploaded backdrop');
        });
    }
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

    conditions = {_id: req.params._id};
    fields = {};

    Movie
        .findOne(conditions, fields)
        .exec(function (err, doc) {

            var retObj = {
                meta: {"action": "create",
                    'timestamp': new Date(),
                    filename: __filename},
                doc: doc, // Only ONE object
                err: err
            };

            return res.send(retObj);
        });
};

/**
 * UPDATE book
 * --------------------
 * Controller to update _one_ movies
 */

exports.updateOne = function (req, res) {
    console.log(req.body.doc);
    var conditions =
        {_id: req.body._id},
        update = {
            title: req.body.title || '',
            year: req.body.author || '',
            imdbUrl: req.body.imdbUrl || '',
            imdbRating: req.body.imdbRating || '',
            poster: req.body.poster || ''
        },
        options = {multi: false},
        callback = function (err, doc) {
            var retObj = {
                meta: {
                    "action": "update",
                    'timestamp': new Date(),
                    filename: __filename,
                    'doc': doc,
                    'update': update
                },
                doc: update,
                err: err
            };
            return res.send(retObj);
        };

    Movie
        .findOneAndUpdate(conditions, update, options, callback);
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
    console.log('Deleting book. ', req.params._id);

    conditions = {_id: req.params._id};
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

    Movie.remove(conditions, callback);
};

exports.posterImage = function (req, res) {
    var imageDir =  __dirname + '../../../uploads/movieposters/';
    var image = req.params._imdbId + '.jpg';

    console.log(imageDir + image);

    fs.readFile(imageDir + image, function(err, data) {
        if (err) throw err; // Fail if the file can't be read.

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
    });
}

exports.backDrop = function (req, res) {
    var imageDir =  __dirname + '../../../uploads/backdrops/';
    var image = req.params._imdbId + '.jpg';

    console.log(imageDir + image);

    fs.readFile(imageDir + image, function(err, data) {
        if (err) throw err; // Fail if the file can't be read.

        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); // Send the file data to the browser.
    });
}