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
        imdbId: {type: String, unique: true},
    }, {collection: 'movies'});

    schemaName.set('versionKey', false);

    modelName = "Movie";
    mongoose.model(modelName, schemaName);
}());



