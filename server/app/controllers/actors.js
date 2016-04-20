/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actor'),
    request = require('request'),
    apiKey = '45ab362206a55b1fbc45857f52a7c8e4';

exports.createActor = function (req, res) {
    var doc = new Actor(req.body);
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

exports.detailActor = function (req, res) {
    var conditions,
        fields;

    conditions = {actorId: req.params._ActorId};
    fields = {};

    Actor
        .findOne(conditions, fields)
        .exec(function (err, doc) {

            // CHECK if actor is already in local database else retrieve data from theMovieDB
            if(doc != null) {
                console.log('Actor found in local DB');
                return res.send(doc)
            } else {
                request({
                    method: 'GET',
                    url: 'http://api.themoviedb.org/3/person/' + req.params._ActorId + '?api_key=' + apiKey + '&append_to_response=movie_credits',
                    headers: {
                        'Accept': 'application/json'
                    }}, function (error, response, body) {
                    body = JSON.parse(body);

                    console.log('Retrieved Actor from the MovieDB, saving to local Database');

                    var doc =  {
                        name: body['name'],
                        knownAs: body['also_known_as'],
                        biography: body['biography'],
                        birthday: body['birthday'],
                        deathday: body['deathday'] || '',
                        homepage: body['homepage'] || '',
                        actorId:  body['id'],
                        placeOfBirth: body['place_of_birth'],
                        profilePath: 'http://image.tmdb.org/t/p/w185/' + body['profile_path'],
                        movieCredits: body['movie_credits']
                    };

                    var newActor = new Actor(doc);

                    newActor.save(function (err) {

                        if(err != null) {
                            console.log('Error saving actor:' + err);
                        } else {
                            console.log('Sucessfully added actor' + doc.name);
                            res.send(doc);
                        }
                    });

                });
            }
        });
};





/*
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
}; */