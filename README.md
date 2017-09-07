# tanzo

A minimal web framewrok and code generator based on express.

## Installation

```
npm install -g gulp 

npm install -g jshint

npm install -g tanzo
```

## Details

Gulpfile and others are set once the project is created. Logs and other necessary modules are configured. Please look into the directories and files for more.

## Usage

```
tanzo serve                                 // Starts the server on port 3000

tanzo new                                   // Setup a new tanzo project

tanzo generate controller [name]            // Generate new controller and router with scaffolding

tanzo generate model [name]                 // Generate new model with scaffolding

tanzo generate router [name]                // Generate new router and corresponding controller with scaffolding

tanzo generate helper [name]                // Generate new helper with scaffolding

tanzo generate middleware [name]            // Generate new middleware with scaffolding

tanzo generate view [name]                  // Generate new view with scaffolding   

tanzo generate view-partial [name]          // Generate new partial with scaffolding
```


### Dependencies

- [Express.js](http://expressjs.com)
- [Passport](https://passportjs.org)
- [Mongoose](https://mongoosejs.com)


### Developer Dependencies

- [Gulp](https://gulpjs.com)
- [Lodash](https://lodash.com)
- [JSHint](https://jshint.com)
 




## npm commands

```
npm serve                     // Local Server

```

## gulp commands

```
gulp serve                    //Nodemon server
```

## Directory structure

```
.
|-- .bowerrc
|-- .jshintrc
|-- .jscsrc
├── .babelrc
├── .eslintrc
├── __tests__
├── api
│   ├── config
│   ├── controllers
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   |── views
|   |-- routes.js
|   |__ app.js
├── node_modules
├── package.json
|-- README.md
├── assets
│   ├── css 
│   ├── img
│   └── js
└── gulpfile.js
```

## License

- MIT


