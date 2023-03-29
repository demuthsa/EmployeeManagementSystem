// from routes folder
const routesEmployees = require("./routes/routesEmployees.js");
const routesShifts = require("./routes/routesShifts.js");
const routesPositions = require("./routes/routesPositions.js");
const routesTimeOffRequests = require("./routes/routesTimeOffRequests.js");
const routesEmployeeShifts = require("./routes/routesEmployeeShifts.js");

// setup express and others
const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code

const bodyParser = require("body-parser");
const cors = require("cors");
// app.use(express.static('public'))
// PORT        = 1818;                 // Set a port number at the top so it's easy to change in the future
PORT = 1819;

// Database
const db = require('./database/db-connector') //can prob delete...
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// REACT VIDEO
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));

//======================================================================================
// potential cors fix (more research/ testing needed )
// link: https://www.twilio.com/blog/add-cors-support-express-typescript-api
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:5173/', 'http://localhost:3000', 'http://localhost:35963', 'http://127.0.0.1:5173', 'http://flip3.engr.oregonstate.edu:35963'];

// Then pass these options to cors:
app.use(cors({
    origin: allowedOrigins
}));
//======================================================================================




// API NOTES / NEED TO ADD
// =======================
// - for all route modules, add SELECT for individual elements to populate UPDATE Form in frontend...
// - might need to fix cors issue above if necessary.
// - Do we need to enforce lowercase or uppercase somewhere???


app.get("/", (req, res) => {
    res.send("This is the home route of the employee database backend sql server. To get data go to /employees , /shifts , /positions , /timeoffrequests , or /employeeshifts .");
  });

// Use routes from /routes
app.use("/employees", routesEmployees);

app.use("/shifts", routesShifts);

app.use("/positions", routesPositions);

app.use("/timeoffrequests", routesTimeOffRequests);

app.use("/employeeshifts", routesEmployeeShifts);

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});