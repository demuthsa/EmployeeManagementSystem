const db = require("../database/db-connector.js");
const express = require("express");
const expressRouter = express.Router();

// READ
// Select all time off requests with a join on employees
expressRouter.get("/", function(req, res) {
    let select_time_off_query = "SELECT Time_off_requests.request_id, Time_off_requests.employee_id, Employees.first_name, Employees.last_name, Time_off_requests.date, Time_off_requests.status FROM Time_off_requests LEFT JOIN Employees ON Time_off_requests.employee_id = Employees.employee_id;";

    db.pool.query(select_time_off_query, (error, rows, fields) => {
        if (error) {
            // Is there a way to use try/catch for error? do I need to use async for that?
            console.error(error);
            res.status(500).send('500: Something broke!');
        } else {
            res.status(200);
            res.json({rows, fields});
        }
    });
});          

// ===============DML SQL, DELETE THIS=====================



// -- [UPDATE]
// -- SELECT Query: selects the clicked on time off request in order to populate the update form status dropdown
// SELECT status 
//     FROM Time_off_requests 
//     WHERE request_id = :request_id_selected_from_update_button

// -- UPDATE Query: updates the selected time off request status based on submission of the form 
// UPDATE Time_off_requests 
//     SET status = :status_input 
//     WHERE request_id = :request_id_selected_from_update_button


// ========================================================



// CREATE
// creates a time off request in the database and inserts automatically as 'pending'
expressRouter.post("/", function(req, res) {
    let insert_time_off_requests_query = "INSERT INTO Time_off_requests (employee_id, date, status) VALUES (?, ?, 'pending');";    
    // INSERT INTO Time_off_requests (employee_id, date, status)
    // VALUES  (:employee_id_input, :date_input, 'pending');
    
    db.pool.query(insert_time_off_requests_query,
        [req.body.employee_id_input, req.body.date_input],
        (error, rows, fields) => {
            if (error) {
                // Is there a way to use try/catch for error? do I need to use async for that?
                console.error(error);
                res.status(500).send('500: Something broke!');
            } else {
                res.status(200);
                res.json({rows, fields});
            }});
});

// POSSIBLE FUTURE UPDATE????
// right now only updating status seems like the appropriate move, this is because you would want to preserve the original
// time off request data while showing the eventual status ('pending', 'approved', 'denied').
// We may need to add full update functionality though if the project requirements/TA/student reviews call for it

// UPDATE 
// update a time off request based on the passed url :id param
expressRouter.put("/:id", function(req, res) {
    let update_time_off_requests_query = "UPDATE Time_off_requests SET status = ? WHERE request_id = ?;";
    // UPDATE Time_off_requests 
    //     SET status = :status_input 
    //     WHERE request_id = :request_id_selected_from_update_button

    db.pool.query(update_time_off_requests_query,
        [req.body.status_input, req.params.id],
        (error, rows, fields) => {
            if (error) {
                // Is there a way to use try/catch for error? do I need to use async for that?
                console.error(error);
                res.status(500).send('500: Something broke!');
            } else {
                res.status(200);
                res.json({rows, fields});
            }});
});

// DELETE 
// deletes a time off request based on the passed url :id param
expressRouter.delete("/:id", function(req, res) {
    let delete_time_off_requests_query = "DELETE FROM Time_off_requests WHERE request_id = ?;";
    // DELETE FROM Time_off_requests WHERE request_id = :request_id_selected_from_delete_button

    db.pool.query(delete_time_off_requests_query,
        [req.params.id],
        (error, rows, fields) => {
            if (error) {
                // Is there a way to use try/catch for error? do I need to use async for that?
                console.error(error);
                res.status(500).send('500: Something broke!');
            } else {
                res.status(200);
                res.json({rows, fields});
            }});
});




module.exports = expressRouter;