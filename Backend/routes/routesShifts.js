const db = require("../database/db-connector.js");
const express = require("express");
const expressRouter = express.Router();

// READ
// Select all shifts
expressRouter.get("/", function(req, res) {
    let select_shifts_query = "SELECT * FROM Shifts;";

    db.pool.query(select_shifts_query, (error, rows, fields) => {
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

// =================DML SQL DELETE THIS======================
// -- [UPDATE]
// -- SELECT Query: selects the clicked on shift in order to populate the update form
// SELECT day_of_week, start_date, end_date, start_time, end_time
//     FROM Shifts 
//     WHERE shift_id = :shift_id_selected_from_update_button

// -- UPDATE Query: updates the selected shift data based on submission of the form 
// UPDATE Shifts 
//     SET day_of_week = :day_of_week_input, 
//         start_date = :start_date_input,
//         end_date = :end_date_input,
//         start_time = :start_time_input,
//         end_time = :end_time_input
//     WHERE shift_id = :shift_id_selected_from_update_button

// =============================================================



// CREATE
// creates a shift in the database
expressRouter.post("/", function(req, res) {
    let insert_shift_query = "INSERT INTO Shifts (day_of_week, start_date, end_date, start_time, end_time) VALUES (?, ?, ?, ?, ?);";    
    // INSERT INTO Shifts (day_of_week, start_date, end_date, start_time, end_time)
    // VALUES  (:day_of_week_input, :start_date_input, :end_date_input, :start_time_input, :end_time_input);
    
    db.pool.query(insert_shift_query,
        [req.body.day_of_week_input, req.body.start_date_input, req.body.end_date_input, req.body.start_time_input, req.body.end_time_input],
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

// UPDATE 
// update a shift based on the passed url :id param
expressRouter.put("/:id", function(req, res) {
    let update_shifts_query = "UPDATE Shifts SET day_of_week = ?, start_date =  ?, end_date = ?, start_time = ?, end_time = ? WHERE shift_id =  ?;";
    // UPDATE Shifts 
    //     SET day_of_week = :day_of_week_input, 
    //         start_date = :start_date_input,
    //         end_date = :end_date_input,
    //         start_time = :start_time_input,
    //         end_time = :end_time_input
    //     WHERE shift_id = :shift_id_selected_from_update_button

    db.pool.query(update_shifts_query,
        [req.body.day_of_week_input, req.body.start_date_input, req.body.end_date_input, req.body.start_time_input, req.body.end_time_input, req.params.id],
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
// deletes a shift based on the passed url :id param
expressRouter.delete("/:id", function(req, res) {
    let delete_shift_query = "DELETE FROM Shifts WHERE shift_id = ?;";
    // DELETE FROM Shifts WHERE shift_id = :shift_id_selected_from_delete_button

    db.pool.query(delete_shift_query,
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