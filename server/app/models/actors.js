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
        name: {type: String, required:true},
        knownAs: {type: Array},
        biography: {type: String},
        birthday: {type: Date},
        deathday: {type: String},
        homepage: {type: String},
        actorId: {type: String, required: true, unique: true},
        placeOfBirth: {type: String},
        profilePath: {type: String},
        movieCredits: {type: Array}
    }, {collection: 'actors'});

    modelName = "Actor";
    mongoose.model(modelName, schemaName);
}());



/**
 * Created by Marko on 19-4-2016.
 */
