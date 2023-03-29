// Simple express app that serves the client side front end react vite build in dist folder

const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code
const path    = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

PORT        = 35963;                 // Set a port number at the top so it's easy to change in the future in between:[1024 < PORT < 65535]
//http://flip3.engr.oregonstate.edu:35963/

// Route that serves the vite-react front end
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // joins the url path to direct to the dist folder build
});

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});