const db = require("../database/db-connector.js");
const express = require("express");
const expressRouter = express.Router();

// READ
// Select all employee_shifts intersection table with an inner join on employees and also time off requests
expressRouter.get("/", function(req, res) {
    let select_employee_shifts_query = "SELECT Employee_shifts.*, Employees.first_name, Employees.last_name, Shifts.* FROM Employee_shifts INNER JOIN Employees ON Employee_shifts.employee_id = Employees.employee_id INNER JOIN Shifts ON Employee_shifts.shift_id = Shifts.shift_id;";
    db.pool.query(select_employee_shifts_query, (error, rows, fields) => {
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


// ================DML SQL DELETE LATER======================
// -- [Create] Query to add a new employee-shift intersection table value
// INSERT INTO Employee_shifts (employee_id, shift_id)
// VALUES  (:employee_id_input, :shift_id_input);

// -- [READ] Query to display the current Employee_shifts table
// SELECT Employee_shifts.employee_shift_id, Employee_shifts.employee_id, Employees.first_name, Employees.last_name, Employee_shifts.shift_id
// FROM Employee_shifts
// INNER JOIN Employees ON Employee_shifts.employee_id = Employees.employee_id;

// -- [READ] Query to display the current Shifts table on the Employee_shifts page
// SELECT * FROM Shifts;

// -- [UPDATE]
// -- SELECT Query: selects the clicked on Employee_shifts value in order to populate the update form
// SELECT employee_id, shift_id 
//     FROM Employee_shifts 
//     WHERE employee_shift_id = :employee_shift_id_selected_from_update_button

// -- UPDATE Query: updates the selected Employee_shifts value data based on submission of the form 
// UPDATE Employee_shifts 
//     SET employee_id = :employee_id_input, 
//         shift_id = :shift_id_input 
//     WHERE employee_shift_id = :employee_shift_id_selected_from_update_button

// -- [DELETE] Query that deletes an Employee_shift value
// DELETE FROM Employee_shifts WHERE employee_shift_id = :employee_shift_id_selected_from_delete_button

// ============================================================

// CREATE
// creates an Employee_shift intersection in the database
expressRouter.post("/", function(req, res) {
    let insert_employee_shift_query = "INSERT INTO Employee_shifts (employee_id, shift_id) VALUES (?, ?);";    
    // INSERT INTO Employee_shifts (employee_id, shift_id)
    // VALUES  (:employee_id_input, :shift_id_input);
    
    db.pool.query(insert_employee_shift_query,
        [req.body.employee_id_input, req.body.shift_id_input],
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
// update an Employee_shift intersection based on the passed url :id param
expressRouter.put("/:id", function(req, res) {
    let update_employee_shifts_query = "UPDATE Employee_shifts SET employee_id = ?, shift_id = ? WHERE employee_shift_id =  ?;";
    // UPDATE Employee_shifts 
    //     SET employee_id = :employee_id_input, 
    //         shift_id = :shift_id_input 
    //     WHERE employee_shift_id = :employee_shift_id_selected_from_update_button

    db.pool.query(update_employee_shifts_query,
        [req.body.employee_id_input, req.body.shift_id_input, req.params.id],
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
// deletes an Employee_shift intersection based on the passed url :id param
expressRouter.delete("/:id", function(req, res) {
    let delete_employee_shift_query = "DELETE FROM Employee_shifts WHERE employee_shift_id = ?;";
    // DELETE FROM Employee_shifts WHERE employee_shift_id = :employee_shift_id_selected_from_delete_button

    db.pool.query(delete_employee_shift_query,
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



