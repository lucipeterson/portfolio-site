//IMPORTS
const express = require('express');
const data = require('./data.json');

const app = express();
const port = 3000;

//SET VIEW ENGINE
app.set("view engine", "pug");

//ROUTE STATIC FILES
app.use(express.static('public'));

//ROUTE PAGES
app.get('/', function (req, res) {
    res.locals = data.projects;
    res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about')
});

app.get('/project', function (req, res) {
    res.render('project')
});

//HANDLE ERRORS
app.get('*', function(req, res, next) {
    let err = new Error('Page Not Found');
    err.statusCode = 404;
    next(err);
  });

app.listen(port, () => console.log(`App listening on port ${port}!`))
