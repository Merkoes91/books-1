/*jslint node:true */

(function () {
    "use strict";
/**
 * Module dependencies.
 * @type {exports}
 */
    var fs = require('fs'),                      // used to read files from the file system(__dirname)
        http = require('http'),                  // enables http protocol
        express = require('express'),           // Fast, unopinionated minimalist web framework for Node.js
        bodyParser = require('body-parser'),    // this does not handle multipart bodies due to their complex and typically large nature
        env,            // save the enviroment
        config,        // point to the config file
        mongoose,
        models_path,
        model_files,
        app,
        routes_path,
        route_files;

/**
 * Load configuration
 * @type {*|string}
 */
    env = process.env.NODE_ENV || 'development'; // if enviroment is not set 'export NODE_ENV=<name> it will take development as default
    config = require('./config/config.js')[env]; // get config file

/**
 * Bootstrap db connection
 * @type {exports}
 */
    mongoose = require('mongoose'); // database driver
    mongoose.connect(config.db); // connect with the database string defined in config

/**
 * Debugging is in enabled in the development enviroment so we can see anything mongoose does in our console
 */
    console.log(config.debug);

    mongoose.connection.on('error', function (err) {
        console.error('MongoDB error: %s', err);
    });
    mongoose.set('debug', config.debug);


/**
 * Bootstrap models
 * @type {string}
 */
    models_path = __dirname + '/app/models'; // set the path to the model files
    model_files = fs.readdirSync(models_path); // read the actual files in the path specified above
    model_files.forEach(function (file) { // require each model found in the directory
        require(models_path + '/' + file);
    });

/**
 * Use express
 * @type {*}
 */
    app = express();  // create the express application

/**
 * Express settings
 */
    app.set('port', process.env.port || config.port); // set the port to 3000 specified in the config file

/**
 * Express middleware
 * Add middleware to parse JSON input; @see https://github.com/expressjs/body-parser#bodyparserjsonoptions
 * Add middleware to parse url-encoded input; @see https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
 */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true})); // we want to make sure everything we send is 64 encoded

    /**
 * Middleware to enable logging
 */
    if (config.debug) {
        app.use(function (req, res, next) {
           // console.log('%s %s %s', req.method, req.url, req.path);

            console.log(req.body);
            next(); // required to move on
        });
    }

/**
 * Middleware to serve static page
 */
    app.use(express.static(__dirname + '/../client/'));

    /**
     * Bootstrap routes
     * @type {string}
     */
    routes_path = __dirname + '/routes';
    route_files = fs.readdirSync(routes_path);
    route_files.forEach(function (file) {
        var route = require(routes_path + '/' + file);
        app.use('/api', route);
    });

/**
 * Middleware to catch all unmatched routes
 */
    app.all('*', function (req, res) {
        res.sendStatus(404);
    });


    module.exports = app;

}());
