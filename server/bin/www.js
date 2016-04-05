/*jslint node:true */

(function () {
    "use strict";

    var app = require('../server.js'), // require our app

        server = app.listen(app.get('port'), function () {
            console.log('Express server listening on port ' + server.address().port);
        });


    /** TODO: Create http server */

}());
