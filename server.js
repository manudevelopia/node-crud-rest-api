const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var db;

var ProjectCtrl = require('./controllers/project.js');
var projects = express.Router();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/local', function(err, database) {
  if (err){return console.log(err);}

  db = database;
  app.listen(3000, function (){
    console.log('Listening on port 3000');
  }); 
});

// API
projects.route('/projects')
  .get(ProjectCtrl.findAll)
  .post(ProjectCtrl.create);
projects.route('/project/:id')
  .get(ProjectCtrl.findById);

app.use('/', projects); // TODO: maybe this coud be changed to /api instead of /

app.get('/projects', ProjectCtrl.findAll);


app.get('/', function(req, res){
  res.redirect('/api');
});

app.get('/api', function (req, res) {
  res.send({
    app: 'node-test', 
    ver: '0.1.0',
    author: '@manudevelopia'
  });

});

app.get('/project/new', function (req, res){
  res.sendFile('/home/manu/Developer/Github/node-crud-rest-api/www/index.html');
});


