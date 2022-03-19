// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
let app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, function () {
  console.log("Server is running of localhost: " + port);
});

app.get('/all', getData);

function getData(req, res)
{
    res.send(projectData);
}

app.post('/add', sendData);

function sendData(req, res)
{
    projectData = req.body;
    console.log(req.body);
}

