/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Movie = mongoose.model('Movie');

/**
 * CREATE a movie
 * --------------------
 * Controller to create a movie
 **/

exports.create = function (req, res) {
    var doc = new Movie(req.body);
    console.log('Creating' + doc.title);
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
        {_id: req.params._id},
        update = {
            title: req.body.doc.title || '',
            year: req.body.doc.author || '',
            imdbUrl: req.body.doc.imdbUrl || '',
            imdbRating: req.body.doc.imdbRating || '',
            poster: req.body.doc.poster || '',
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