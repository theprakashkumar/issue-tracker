'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

const mongoose = require('mongoose');
const Issue = require('./models/issue')
const Project = require('./models/project');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect with database
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log("Connected 🔥"))
.catch(err => console.log("Someting Went Wrong :(", err));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        let error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; //for testing


// {
//   "assigned_to":"second",
//   "status_text":"",
//   "open":true,
//   "_id":"5fff38609dbc6049319aa255",
//   "issue_title":"first",
//   "issue_text":"first text",
//   "created_by":"Firster",
//   "created_on":"2021-01-13T18:13:52.828Z","updated_on":"2021-01-13T18:13:52.828Z"
// }

// {
//   "open":true,
//   "created_on":"2021-01-13T18:16:19.752Z","updated_on":"2021-01-13T18:16:19.752Z","_id":"5fff3a0ea8af08237654c5ae",
//   "issue_title":"fristf",
//   "issue_text":"first textif",
//   "created_by":"fif",
//   "assigned_to":"secf",
//   "status_text":"",
//   "__v":0}
// {"open":true,"created_on":"2021-01-17T08:22:07.380Z","updated_on":"2021-01-17T08:22:07.380Z","_id":"6003f3c45f14fd1896915468","issue_title":"first ","issue_text":"first text","created_by":"firster","assigned_to":"","status_text":"","__v":0}

// {"assigned_to":"","status_text":"","open":true,"_id":"6003f40783c646762441b8fe","issue_title":"first","issue_text":"first text","created_by":"firster","created_on":"2021-01-17T08:23:35.989Z","updated_on":"2021-01-17T08:23:35.989Z"}