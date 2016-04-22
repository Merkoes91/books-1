/**
 * Created by Marko on 20-4-2016.
 */

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
        backdrop: {type: String, "default": "N/A"},
        genres: {type: Array},
        homepage: {type: String, "default": 'N/A'},
        imdbId: {type: String, unique: true},
        origLang: {type: String},
        origTitle: {type: String},
        plot: {type: String},
        poster: {type: String},
        prodCompanies: {type: Array},
        prodCountries: {type: Array},
        releaseDate: {type: Date},
        releaseStatus: {type: String},
        credits: {type: Array}
    }, {collection: 'moviesDatabase'});

    modelName = "MovieDatabase";
    mongoose.model(modelName, schemaName);
}());



