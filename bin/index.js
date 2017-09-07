#!/usr/bin/env node

var util = require('util');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

var dirs = ['./api', './api/controllers', './api/models', './api/routes', './api/middlewares', './api/helpers', './api/config', './api/views', './api/views/partials', './assets', './assets/css', './assets/img', './assets/js', './assets/js/libs'];

var npmPackages = ['npm install --save express', 'npm install --save body-parser', 'npm install --save cookie-parser', 'npm install --save csurf', 'npm install --save express-session', 'npm install --save helmet', 'npm install --save passport', 'npm install --save morgan', 'npm install --save ejs', 'npm install --save request', 'npm install --save mongoose', 'npm install --save bcrypt-nodejs', 'npm install --save connect-flash', 'npm install --save connect-redis', 'npm install --save redis', 'npm install --save file-stream-rotator', 'npm install --save passport-local', 'npm install --save lodash', 'npm install --save-dev gulp', 'npm install --save-dev gulp-jscs', 'npm install --save-dev gulp-jshint', 'npm install --save-dev gulp-nodemon', 'npm install --save-dev jshint', 'npm install --save-dev jshint-stylish'];

var repository = {
    "type": "git",
    "url": "https://example.com"
};

var scripts = {
    "serve": "gulp serve",
    "build": "NODE_ENV=production"
};

var eslint = {
    "extends": "airbnb"
};


var jscsrc = {
    "excludeFiles": ["node_modules/**", "bower_components/**"],

    "requireCurlyBraces": ["if", "else", "for", "while", "do", "try", "catch"],
    "requireOperatorBeforeLineBreak": true,
    "requireCamelCaseOrUpperCaseIdentifiers": true,
    "maximumLineLength": {
        "value": 200,
        "allowComments": true,
        "allowRegex": true
    },
    "validateIndentation": 4,
    "validateQuoteMarks": "'",

    "disallowMultipleLineStrings": true,
    "disallowMixedSpacesAndTabs": true,
    "disallowTrailingWhitespace": true,
    "disallowSpaceAfterPrefixUnaryOperators": true,
    "disallowMultipleVarDecl": null,

    "requireSpaceAfterKeywords": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch"],
    "requireSpaceBeforeBinaryOperators": ["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", "+=", "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&", "|", "^", "&&", "||", "===", "==", ">=", "<=", "<", ">", "!=", "!=="],
    "requireSpaceAfterBinaryOperators": true,
    "requireSpacesInConditionalExpression": true,
    "requireSpaceBeforeBlockStatements": true,
    "disallowSpacesInsideObjectBrackets": "all",
    "disallowSpacesInsideArrayBrackets": "all",
    "disallowSpacesInsideParentheses": true,

    "disallowMultipleLineBreaks": true,

    "disallowCommaBeforeLineBreak": null,
    "disallowDanglingUnderscores": null,
    "disallowEmptyBlocks": null,
    "disallowTrailingComma": null,
    "requireCommaBeforeLineBreak": null,
    "requireDotNotation": null,
    "requireMultipleVarDecl": null,
    "requireParenthesesAroundIIFE": true
};

var jshintrc = {
    "bitwise": true,
    "camelcase": true,
    "curly": true,
    "eqeqeq": true,
    "es3": false,
    "forin": true,
    "freeze": true,
    "immed": true,
    "indent": 4,
    "latedef": "nofunc",
    "newcap": true,
    "noarg": true,
    "noempty": true,
    "nonbsp": true,
    "nonew": true,
    "plusplus": false,
    "quotmark": "single",
    "undef": true,
    "unused": false,
    "strict": false,
    "maxparams": 10,
    "maxdepth": 5,
    "maxstatements": 40,
    "maxcomplexity": 8,
    "maxlen": 220,

    "asi": false,
    "boss": false,
    "debug": false,
    "eqnull": true,
    "esnext": false,
    "evil": false,
    "expr": false,
    "funcscope": false,
    "globalstrict": false,
    "iterator": false,
    "lastsemic": false,
    "laxbreak": false,
    "laxcomma": false,
    "loopfunc": true,
    "maxerr": 50,
    "moz": false,
    "multistr": false,
    "notypeof": false,
    "proto": false,
    "scripturl": false,
    "shadow": false,
    "sub": true,
    "supernew": false,
    "validthis": false,
    "noyield": false,

    "browser": true,
    "node": true,

    "globals": {
        "angular": false
    }
};

var readme = "Tanzo: A minimal web framework in nodejs\n";

var gulpFile = 'var gulp = require(\'gulp\');\n\nvar jshint = require(\'gulp-jshint\');\n\nvar jscs = require(\'gulp-jscs\');\n\nvar nodemon = require(\'gulp-nodemon\');\n\nvar jsFiles = [\'*.js\',\'src/**/*.js\',\'api/**/*.js\'];\n\n\n\ngulp.task(\'style\',function(){\n   return gulp.src(jsFiles)\n       .pipe(jshint())\n       .pipe(jshint.reporter(\'jshint-stylish\',{\n           verbose: true\n       }))\n       .pipe(jscs());\n});\n\ngulp.task(\'serve\',[\'style\'],function(){\n   var options = {\n       script: \'./api/app.js\',\n       delayTime: 1,\n       env:{\n           \'PORT\': 3000\n       },\n       watch: jsFiles\n   };\n\n    return nodemon(options)\n        .on(\'restart\',function(ev){\n            console.log(\'Restarting.....\');\n        });\n});\n';

var css = 'body{\nbackground: #00C9FF; /* fallback for old browsers */\nbackground: -webkit-linear-gradient(to left, #00C9FF , #92FE9D); /* Chrome 10-25, Safari 5.1-6 */\nbackground: linear-gradient(to left, #00C9FF , #92FE9D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n}\n';

var appJS = '//Requires for the logs generation::Start\nvar fs = require(\'fs\');\nvar FileStreamRotator = require(\'file-stream-rotator\');\nvar morgan = require(\'morgan\');\n//Requires for the logs generation::End\n//var redis   = require("redis");\nvar bodyParser = require(\'body-parser\');\nvar cookieParser = require(\'cookie-parser\');\nvar session = require(\'express-session\');\nvar flash = require(\'connect-flash\');\n//var redisStore = require(\'connect-redis\')(session);\n//var client  = redis.createClient();\nvar express = require(\'express\');\nvar app = express();\n\n//Logging Starts\n\nvar logDirectory = __dirname + \'/logs\';\n\n// ensure log directory exists\nfs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);\n\n// create a rotating write stream\nvar accessLogStream = FileStreamRotator.getStream({\n   date_format: \'YYYY-MM-DD\',\n   filename: logDirectory + \'/logs-%DATE%.log\',\n   frequency: \'daily\',\n   verbose: false\n});\n\napp.use(morgan(\'combined\', { stream: accessLogStream }));\n\n//Logging Ends\napp.use(express.static(\'assets\'));\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({extended:true}));\napp.use(cookieParser());\n\n//Uncomment to use Redis session\n/*app.use(session({\n   secret: \'asdfasdfa\',\n   // create new redis store.\n   store: new redisStore({ host: \'localhost\', port: 6379, client: client,ttl :  260}),\n   saveUninitialized: false,\n   resave: false\n}));*/\napp.set(\'view engine\',\'ejs\');\n\n//Uncomment to use passport after configuring passport\n//require(\'./helpers/passport\')(app);\nrequire(\'./routes\')(app,express);\n\n\napp.listen(3000);\n';

var routesJS = 'module.exports = function(app,express){\n    var sampleRoutes = require(\'./routes/SampleRouter\')(express);\n    app.use(sampleRoutes);\n};\n';

var sampleControllerJS = 'module.exports = {\n\n    index:function (req, res) {\n        res.render(\'../api/views/SampleView\');\n    }\n\n};\n';

var sampleRouterJS = 'var SampleController = require(\'../controllers/SampleController\');\n\nmodule.exports = function(express) {\n\n    var SampleRouter = express.Router();\n\n    SampleRouter.get(\'/\',SampleController.index);\n\n    \n    return SampleRouter;\n};\n';

var sampleViewEJS = '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>\n    <meta name="theme-color" content="#2196F3">\n    <title>Tanzo</title>\n\n    <!-- CSS  -->\n    <link href="css/style.css" type="text/css" rel="stylesheet">\n</head>\n<body>\n<h1 style="color:#fff;font-size:180px;text-align:center;font-family:"Comic Sans MS", cursive, sans-serif;margin-top:50%;"><i>tanzo</i></h1>\n</body>\n</html>\n';

main();

function main() {
    var args = process.argv;
    switch (args.length) {
        case 3:
            if (args[2] == 'new') {
                setupTanzo();
                showComplete(' creation of a new project in current directory.');
            } else if (args[2] == 'serve'){
                console.log('Server started at localhost:3000. Use Ctr+C to terminate.')
                child_process.execSync('gulp serve',function (error, stdout, stderr) {
                                                                                    if (error) {
                                                                                        console.error('exec error: ' + error);
                                                                                        return;
                                                                                    }
                                                                                    console.log(stdout);
                                                                                    console.log(stderr);
                });
            }
            else {
                showUsage();
            }
            break;
        case 4:
            if (args[2] == 'generate' && args[3] == 'test') {
                generateComponentTestFiles();
                showComplete();
            } else {
                showUsage();
            }
            break;
        case 5:
            if (args[2] == 'generate' && args[3] == 'controller') {
                generateControllerFile(args[4]);
                generateRouterFile(args[4]);
                showComplete(' creation of controller file in (./api/controllers). Also made a corresponding router file in (./api/routes).');
            } else if (args[2] == 'generate' && args[3] == 'model') {
                generateModelFile(args[4]);
                showComplete(' creation of model file in (./api/models).');
            } else if (args[2] == 'generate' && args[3] == 'router') {
                generateRouterFile(args[4]);
                generateControllerFile(args[4]);
                showComplete(' creation of router file in (./api/routes). Also made a corresponding controller file in (./api/controllers).');
            } else if (args[2] == 'generate' && args[3] == 'view') {
                generateViewFile(args[4]);
                showComplete(' creation of view file in (./api/views).');
            } else if (args[2] == 'generate' && args[3] == 'view-partial') {
                generateViewPartialFile(args[4]);
                showComplete(' creation of view-partial file in (./api/views/partials).');
            } else if (args[2] == 'generate' && args[3] == 'middleware') {
                generateMiddlewareFile(args[4]);
                showComplete(' creation of middleware file in (./api/middlewares).');
            } else if (args[2] == 'generate' && args[3] == 'helper') {
                generateHelperFile(args[4]);
                showComplete(' creation of helper file in (./api/helpers).');
            } else {
                showUsage();
            }
            break;
        default:
            showUsage();
            break;
    }
}

function showUsage() {
    console.log("\n\n\t\t888888888888\n\t\t     88     88888   88 888   888888     888\n\t\t     88    88  88   888  88     88     8   8\n\t\t     88    88  88   88   88    88      8   8\n\t\t     88     888888  88   88   888888    888\n\t\t");    console.log('Usage:');
    console.log('tanzo new                           : Setup a Tanzo project in current dir');
    console.log('tanzo generate controller [Name]    : Generate the Controller');
    console.log('tanzo generate model [Name]         : Generate the Model');
    console.log('tanzo generate router  [Name]       : Generate the Router ');
    console.log('tanzo generate middleware [Name]    : Generate the Middleware');
    console.log('tanzo generate helper [Name]        : Generate the Helper');
    console.log('tanzo generate view [Name]          : Generate the View');
    console.log('tanzo generate view-partial [Name]  : Generate the View Partial');

    process.exit(-1);
}

function showComplete() {
    var y = arguments.length <= 0 || arguments[0] === undefined ? '!' : arguments[0];

    console.log('Completed' + y);
}

function setupTanzo(arg) {
    createDirectories(dirs);
    createJSON('package.json',{
            "name": "tanzo",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "keywords": [],
            "author": "",
            "license": "ISC"
        }
    );
    fixJSON('package.json', 'description', 'Tanzo');
    fixJSON('package.json', 'repository', repository);
    fixJSON('package.json', 'scripts', scripts);
    fixJSON('package.json', 'license', 'MIT');
    createJSON('.bowerrc', { "directory": "assets/lib" });
    createJSON('.eslintrc', eslint);
    createJSON('.jscsrc', jscsrc);
    createJSON('.jshintrc', jshintrc);
    createJSON('.babelrc', { "presets": ["es2015", "stage-0"] });
    createFile('README.md',readme);
    createFile('./assets/css/style.css', css);
    createFile('gulpfile.js', gulpFile);
    createFile('./api/routes.js', routesJS);
    createFile('./api/app.js', appJS);
    createFile('./api/controllers/SampleController.js', sampleControllerJS);
    createFile('./api/views/SampleView.ejs', sampleViewEJS);
    createFile('./api/routes/SampleRouter.js', sampleRouterJS);
    npmInstall(npmPackages);
}

function generateControllerFile(name) {
    var code = "\nmodule.exports = {\n\n    index:function (req, res) {\n        //Set the view here\n        res.render('../api/views/..');\n    },\n    create:function(req,res){\n        //Logic goes here\n    },\n    retrieve:function(req,res){\n        //Logic goes here\n    },\n    update:function(req,res){\n        //Logic goes here\n    },\n    delete:function(req,res){\n        //Logic goes here\n    }\n    //Other functions goes here\n    \n\n};\n";

    createFile('./api/controllers/' + capitalize(name.toLowerCase()) + 'Controller.js', code);
}

function generateModelFile(name) {
    var code = "var mongoose = require('mongoose');\n//Uncomment for encryption library\n//var bcrypt = require('bcrypt-nodejs');\n//Can add other modules here\n\nvar " + name.toLowerCase() + "Schema = mongoose.Schema({\n    table:{\n        field1:Type,\n        field2:Type\n    }\n    //Declare other fields here\n});\n//Declare methods here\n" + name.toLowerCase() + "Schema.methods.someMethod = function(..){\n    return ..;\n};\n\nmodule.exports = mongoose.model('" + capitalize(name.toLowerCase()) + "'," + name.toLowerCase() + "Schema);\n";

    createFile('./api/models/' + capitalize(name.toLowerCase()) + '.js', code);
}

function generateRouterFile(name) {
    var code = "var " + capitalize(name.toLowerCase()) + "Controller = require('../controllers/" + capitalize(name.toLowerCase()) + "Controller');\n\nmodule.exports = function(express) {\n\n    var " + capitalize(name.toLowerCase()) + "Router = express.Router();\n\n    " + capitalize(name.toLowerCase()) + "Router.get('/..'," + capitalize(name.toLowerCase()) + "Controller.retrieve);\n  \n    " + capitalize(name.toLowerCase()) + "Router.post('/../..'," + capitalize(name.toLowerCase()) + "Controller.create);\n    \n    " + capitalize(name.toLowerCase()) + "Router.put('/../..'," + capitalize(name.toLowerCase()) + "Controller.update);\n    \n    " + capitalize(name.toLowerCase()) + "Router.delete('/../..'," + capitalize(name.toLowerCase()) + "Controller.delete);\n    \n    return " + capitalize(name.toLowerCase()) + "Router;\n};\n";

    createFile('./api/routes/' + capitalize(name.toLowerCase()) + 'Router.js', code);

}

function generateViewFile(name) {
    var code = '<!DOCTYPE html><html lang="en">\n    <head>\n      <title>..</title>\n      <meta  charset=\'UTF-8\'>\n      <!--Style links goes here-->\n      <link href="css/style.css" type="text/css" rel="stylesheet">\n    </head>\n    <body>\n      <!--Partials can go here or anywhere where they are appropriate:)-->\n      <%- include /partials/something.ejs %>\n      <!--Scripts can go here-->\n      <!--<script src="min/plugin-min.js"></script>\n      <script src="js/init.js"></script> -->\n    </body>\n  </html>\n';

    createFile('./api/views/' + name.toLowerCase() + '.ejs', code);
}

function generateViewPartialFile(name) {
    var code = '<div></div>\n';

    createFile('./api/views/partials/_' + name.toLowerCase() + '.ejs', code);
}

function generateMiddlewareFile(name) {
    var code = "//May pass app or express in the function\nmodule.exports = function(){\n    //Logic goes here\n};\n";

    createFile('./api/middlewares/' + name.toLowerCase() + '.js', code);
}

function generateHelperFile(name) {
    var code = "//May pass app or express in the function\nmodule.exports = function(){\n    //Logic goes here\n};\n";
    
    createFile('./api/helpers/' + name.toLowerCase() + '.js', code);
}

function getFileNames(dir) {
    if (fs.existsSync(dir)) {
        return fs.readdirSync(dir);
    }
    return [];
}

function createDirectories(dirs) {
    dirs.map(function (dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log('Create:', dir);
        }
    });
}

function npmInstall(npms) {
    npms.map(function (command) {
        console.log(command);
        child_process.execSync(command,puts);
    });
}

function puts(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
}

function createFile(file, content) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, content);
        console.log('Create:', file);
    }
}

function createJSON(file, json) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify(json, null, "  "));
        console.log('Create:', file);
    }
}

function fixJSON(file, key, value) {
    var json = JSON.parse(fs.readFileSync(file));
    json[key] = value;
    fs.writeFileSync(file, JSON.stringify(json, null, "  "));
    console.log('Fix:', file, 'Key:', key);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
