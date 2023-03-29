const db = require("../database/db-connector.js");
const express = require("express");
const expressRouter = express.Router();

// READ
// Select all positions
expressRouter.get("/", function(req, res) {
    let select_positions_query = "SELECT * FROM Positions;";

    db.pool.query(select_positions_query, (error, rows, fields) => {
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

// ===============DML UPDATE and UPDATE SELECT================
// -- [UPDATE]
// -- SELECT Query: selects the clicked on position in order to populate the update form
// SELECT position_title, shift, department 
//     FROM Positions 
//     WHERE position_id = :position_id_selected_from_update_button

// -- UPDATE Query: updates the selected position data based on submission of the form 
// UPDATE Positions 
//     SET position_title = :position_title_input, 
//         shift = :shift_input, 
//         department = :department_input 
//     WHERE position_id = :position_id_selected_from_update_button
// ===============================================================



// CREATE
// creates a position in the database
expressRouter.post("/", function(req, res) {
    let insert_positions_query = "INSERT INTO Positions (position_title, shift, department) VALUES (?, ?, ?);";    
    // INSERT INTO Positions (position_title, shift, department)
    // VALUES  (:position_title_input, :shift_input, :department_input);
    
    db.pool.query(insert_positions_query,
        [req.body.position_title_input, req.body.shift_input, req.body.department_input],
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
// update a position based on the passed url :id param
expressRouter.put("/:id", function(req, res) {
    let update_positions_query = "UPDATE Positions SET position_title = ?, shift =  ?, department = ? WHERE position_id =  ?;";
    // UPDATE Positions 
    // SET position_title = :position_title_input, 
    //     shift = :shift_input, 
    //     department = :department_input 
    // WHERE position_id = :position_id_selected_from_update_button

    db.pool.query(update_positions_query,
        [req.body.position_title_input, req.body.shift_input, req.body.department_input, req.params.id],
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
// deletes a position based on the passed url :id param
expressRouter.delete("/:id", function(req, res) {
    let delete_positions_query = "DELETE FROM Positions WHERE position_id = ?;";
    // DELETE FROM Positions WHERE position_id = :position_id_selected_from_delete_button

    db.pool.query(delete_positions_query,
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