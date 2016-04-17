/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    request = require('request'),
    apiKey = '45ab362206a55b1fbc45857f52a7c8e4';


/**
 * Query for movies using themoviedb.org
 * --------------------
 */


exports.list = function (req, res) {
    request({
        method: 'GET',
        url: 'http://api.themoviedb.org/3/search/movie?query=' + req.params._searchString + '&api_key=' + apiKey,
        headers: {
            'Accept': 'application/json'
        }}, function (error, response, body) {
        console.log('Status:', response.statusCode);
        return res.send(body);
    });
};

exports.config = function (req, res) {
    var request = require('request');

    request({
        method: 'GET',
        url: 'http://api.themoviedb.org/3/configuration?api_key=' + apiKey,
        headers: {
            'Accept': 'application/json'
        }}, function (error, response, body) {
        console.log('Status:', response.statusCode);
        return res.send(body);
    });
}

exports.detail = function (req, res) {
    request({
        method: 'GET',
        url: 'http://api.themoviedb.org/3/movie/' + req.params._id + '?api_key=' + apiKey,
        headers: {
            'Accept': 'application/json'
        }}, function (error, response, body) {
        console.log('Status:', response.statusCode);
        return res.send(body);
    });
};
