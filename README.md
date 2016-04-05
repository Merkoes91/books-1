Changelog
===========
## Video 1:
Nothing changed i've only imported the data from the data/seed directory in to my own local mongo --C:\Mongo\bin>mongorestore -d books C:\Users\Marko\workspaces\books-1\data"

## Video 2(https://www.youtube.com/watch?v=1NByK6kXutk&list=PLG1mkqKjiDY-gDQymDbn1h4WbJ56N48ln&index=2)
- Ran npm install to install the node modules
- changed the versions in package.json to * to install the latest versions
- changed the start script to node bin/www.js
- changed database connection to 127.0.0.1:27017/books
- set up the server.js file according to the steps done in the video
- testing will be done in a later video

## Video 3(https://www.youtube.com/watch?v=zO9Wnxaja1Y&list=PLG1mkqKjiDY-gDQymDbn1h4WbJ56N48ln&index=3)
- adding model

__Question: What are the differences between a 'Schema Type' and a JSON object? Use the references to motivate your answer.__
_Answer: A Schema Type defines defaults, validation, getters, setter and other general characteristics for String and Numbers. So basically it defines which attributes a
JSON object will have and the rules for the values of these attributes. Ref: http://mongoosejs.com/docs/schematypes.html_

__Question: What is the function of the 'collection' property?__
_Answer: Mongoose produces a default collection name by passing the model name. This method pluralizes the name (so for example book model, the collection will be called books)
if you want a different name for your collection change this attribute.  Ref: http://mongoosejs.com/docs/guide.html#collection_

__Question: Suppose you have a model for 'Person'. What would be the default collection name?__
_Answer: As said in the questions above by default the schema name is pluralized but there is a dictionary with plurals behind so it would not be Persons but People instead._

__Question: What are the differences between a 'Model' and a 'Schema Type'? Use the references to motivate your answer.__
_Answer: Models are constructors compiled from the Schema definitions. CRUD Operations can be handled by these models._



## Video 4(https://www.youtube.com/watch?v=9ZBM_wZxwWg&index=4&list=PLG1mkqKjiDY-gDQymDbn1h4WbJ56N48ln)
added a save document in our controller to create a new book

__Question: What are the differences between MongoDb and Mongoose?
_Answer: Mongodb is the native driver for interacting with a mongodb instance.
Mongoose is a dependency built upon the mongodb drive to providing programmers a way to model their data

__Question: explain the concepts of 'schema type' and 'model'. How are they related?
_Answer: in a schema type you handle the definition of defaults, validation, getters, setters and other general characteristics
Models are fancy concstructors compliled from the schema type definition they represent documents which can be saved and retrieved
from our database.


__Question: What will happen if you throw an error on the server?
_Answer: The err is send in a response object to the browser. i guess in theory you could log this object or the error message
on the server as well. Can't this this at the moment because the functionality is not completely working yet.




Description
===========
This demo is MEAN with books.

Video available at http://goo.gl/KswfXf

Presentation available at http://goo.gl/idIiq3

**Your assignment: Fix the TODO's**


Setup
=====
Installation for development
----------------------------

Create a directory `workspaces` in your home directory.
```
mkdir ~/workspaces
```

Clone the repository with
```
git clone https://github.com/theotheu/books.git ~/workspaces/books
```

Go to the working directory
```
cd ~/workspaces/books
```

See the README in ~/workspaces/books/data how to import the initial seed


Configuration
----------
Copy ```config.js.default``` to ```config.js```.
```sh
cp ~/workspaces/books/server/config/config.js.default ~/workspaces/books/server/config/config.js
```

Change the database, port and emailaddress.

Example
```javascript
module.exports = {
    development: {
        db: 'mongodb://localhost/books-dev',
        port: 3000,
        debug: true
    }
    , test: {
        db: 'mongodb://localhost/books-tst',
        port: 3000,
        debug: false
    }
    , production: {
    }
}
```

Install node modules
----------
The archive is without the node modules.

Install with
```sh
cd ~/workspaces/books/server
npm install
```

Export variable to set environment
----------------------------------
Node.js starts default with the development environment.

To set explicitly the environment, use an environment variable. With this, you do not have to change a single line of code for switching environments.

Valid values are defined in the config/config.js file (development, test, production).

```export NODE_ENV=development```


supervisor
----------
Make sure you have `nodemon` installed - with the global option

```sh
npm install -g nodemon
```

Use it with
```
nodemon
```

Tests
----------
See the README in `~/workspaces/books/tests` how to perform tests


Instructions to prepare a deployment
===================================

- Verify that you have a explanatory README.md
  - Installation instructions
  - Configuration instructions
  - Import data instructions
  - Run instructions
  - Test instructions
- Export data
  - Make sure that the output directory exist ```mkdir ~/workspaces/books/data```
  - Make an export of your data with mongodump ```mongodump -d books -o ~/workspaces/books/data```
  - Create in ~/workspaces/books/data a README.md with import instructions.
  - Import instructions
- Tests
  - static-analyzer with 0 errors
  - Unit tests with 0 errors
  - End-to-end tests with 0 errors
- Push the repository



