/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    request = require('request'),
    http = require('http'),
    apiKey = '45ab362206a55b1fbc45857f52a7c8e4';

/**
 * Query for movies using themoviedb.org
 * --------------------
 */
exports.queryFunction = function (req, res) {

    var url = 'http://api.themoviedb.org/3/search/movie?query=' + req.params._searchString + '&api_key=' + apiKey;



    http.get(url, function(response) {
        console.log("Got response: " + res.statusCode);

        response.on("data", function(chunk) {
            console.log("BODY: " + chunk);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
};







// 45ab362206a55b1fbc45857f52a7c8e4