//IMPORTS
const express = require('express');
const data = require('./data.json');
const projectData = data.projects;

//CONSTANTS
const app = express();
const port = process.env.PORT || 3000;

//SETTINGS
app.set('view engine','pug');

//ROUTE STATIC FILES
app.use('/static', express.static('public'));
app.use('/static', express.static('images'));

//ROUTE PAGE TEMPLATES
app.get('/', function (req, res) {
    res.render('index', { projects: projectData });
});

app.get('/about', function (req, res) {
  res.render('about')
});

app.get('/project/:id', function (req, res) {
  res.render('project', { projects: projectData[req.params.id] })
});

//HANDLE ERRORS
app.get('*', function(req, res, next) {
    let err = new Error('Page Not Found');
    err.statusCode = 404;
    next(err);
  });

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  console.log(err.message);
  res.render('error', err);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

