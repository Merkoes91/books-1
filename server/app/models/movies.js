/**
 * Created by Marko on 8-4-2016.
 */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelName;


    schemaName = new Schema({
        title: {type: String, required: true, unique: true},
        year: {type: String},
        imbdUrl: {type: String},
        imdbId: {type: String},
        imdbRating: {type: String},
        actors: {type: Array},
        plot: {type: String},
        poster: {type: String, required: true},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: 'movies'});


    modelName = "Movie";
    mongoose.model(modelName, schemaName);
}());