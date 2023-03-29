// ./database/db-connector.js

// Get an instance of mysql we can use in the app
const mysql = require('mysql')

// -------------- connection pools -- comment out the one that is NOT in use -------------

// Create a 'connection pool' using the provided credentials for sam
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_demuths',
//     password        : '6610',
//     database        : 'cs340_demuths'
// })

// Create a 'connection pool' using the provided credentials for zac
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_maesz',
    password        : '9384',
    database        : 'cs340_maesz'
})

// ------------------------------------------------------------------------------------------

// Export it for use in our applicaiton
module.exports.pool = pool;