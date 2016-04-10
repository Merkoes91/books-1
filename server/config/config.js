/*jslint node:true */

module.exports = {
    development: {
        db: 'mongodb://127.0.0.1:27017/books',        // change books with your database
        port: 3000,                             // change 3000 with your port number
        debug: true                             // set debug to true|false
    },
    test: {
        db: 'mongodb://127.0.0.1:27017/books-test',        // change books with your database
        port: 1300,                             // change 1300 with your port number
        debug: false                            // set debug to true|false
    },
    production: {}
};