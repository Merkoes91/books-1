/*jslint node: true */
"use strict";

/** TODO: Test with static-analyzer */

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

/**
 * CREATE a book
 * --------------------
 * Controller to create a book.
 **/

exports.create = function (req, res) {
    var doc = new Book(req.body);
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
 * RETRIEVE _all_ books
 * --------------------
 * Controller to retrieve _all_ books.
 */
exports.list = function (req, res) {
    var conditions,
        fields,
        sort;

    conditions = {};
    fields = {};
    sort = {'modificationDate': -1};

    Book
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
 * RETRIEVE _one_ book
 * --------------------
 * Controller to retrieve _one_ books.
 */

exports.detail = function (req, res) {
    var conditions,
        fields;

    conditions = {_id: req.params.id};
    fields = {};

    Book
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
 * Controller to update _one_ books.
 */

exports.updateOne = function (req, res) {
    var conditions =
        {_id: req.params._id},
        update = {
            title: req.body.doc.title || '',
            author: req.body.doc.author || '',
            description: req.body.doc.description || ''
        },
        callback = function (err, doc) {
            var retObj = {
                meta: {"action": "create",
                    'timestamp': new Date(),
                    filename: __filename},
                doc: doc, // Only ONE object
                err: err
            };
            return res.send(retObj);
        };

    Book
        .findOneAndUpdate(conditions, update,callback);

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

exports.deleteOne = function (req, res) {
    var conditions,
        callback;
    console.log('Deleting book. ', req.params.id);

    conditions = {_id: req.params._id};
    callback = function (err, doc) {

        var retObj = {
            meta: {"action": "create",
                'timestamp': new Date(),
                filename: __filename},
            doc: doc, // Only ONE object
            err: err
        };
        return res.send(retObj);
    };

    Book.remove(conditions, callback);
};