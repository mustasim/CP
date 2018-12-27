'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Configure our "templating engine", which is
// Mozilla's "Nunjucks" in this case.
const nunjucks = require('nunjucks');

const app = express();

// Import our controllers from their files. Notice how we're
// giving the `require` built-in function the path a file
// locally instead of a dependency that was installed as
// specified in our `package.json` file, like "express".
const indexControllers = require('./controllers/index.js');

// Through this configuration, Nunjucks will "tell"
// our Express app that it is handling the templates,
// so that when we call the `render` function on a
// response object, it will rely on Nunjucks.
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configure our app to serve "static" assets,
// like client-side images, js, and css out of
// a directory called "static".
app.use('/static', express.static('static'));

// Now, attach our "controllers" to our "routes".
app.get('/', indexControllers.index);
app.get('/about', indexControllers.about);
app.get('/events/new', indexControllers.neweventperson);
app.post('/events/:id(\\d+)', indexControllers.addattendee);
app.post('/events/new', indexControllers.newevent);
app.get('/events/:id(\\d+)', indexControllers.events);
app.get('/donate', indexControllers.donate);
app.post('/neweventperson/:id', indexControllers.neweventperson);
module.exports = app;

const crypto = require('crypto');

const email = ''.toLowerCase();
const teamNickname = 'crimson-silence';
const cc = crypto.createHash('sha256')
    .update(`${email}-${teamNickname}`)
    .digest('hex')
    .substring(0, 7);
console.log(cc);


