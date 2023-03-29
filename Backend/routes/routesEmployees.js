const db = require("../database/db-connector.js");
const express = require("express");
const expressRouter = express.Router();

// MAY NEED TO CHANGE STATUS CODES, not sure though

// READ
// Select all employees, but also join their positions for viewing pleasure
expressRouter.get("/", function(req, res) {
    let basic_select_employees_query = "SELECT * FROM Employees;"; // not used...delete?
    let joined_employees_positions_query = "SELECT Employees.employee_id, Employees.first_name, Employees.last_name, Employees.position_id, Positions.position_title, Positions.shift, Positions.department, Employees.email, Employees.phone_number, Employees.address FROM Employees LEFT JOIN Positions ON Employees.position_id = Positions.position_id;";
    // ^ Add this query to DML.sql later [not completed]

    db.pool.query(joined_employees_positions_query, (error, rows, fields) => {
        if (error) {
            // Is there a way to use try/catch for error? do I need to use async for that?
            console.error(error);
            res.status(500).send('500: Something broke!');
        } else {
            res.status(200);
            res.json({rows, fields});
        }});
});          

// CREATE
// creates an employee in the database
expressRouter.post("/", function(req, res) {
    let insert_employees_query = "INSERT INTO Employees (position_id, first_name, last_name, email, address, phone_number) VALUES (?, ?, ?, ?, ?, ?);";    
    // INSERT INTO Employees (position_id, first_name, last_name, email, address, phone_number)
    // VALUES  (:position_id_input, :first_name_input, :last_name_input, :email_input, :address_input, :phone_number_input);
    
    db.pool.query(insert_employees_query,
        [req.body.position_id_input, req.body.first_name_input, req.body.last_name_input, req.body.email_input, req.body.address_input, req.body.phone_number_input],
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
// update an employee based on the passed url :id param
expressRouter.put("/:id", function(req, res) {
    let update_employees_query = "UPDATE Employees SET position_id = ?, first_name = ?, last_name = ?, email = ?, address = ?, phone_number = ? WHERE employee_id = ?;";
    db.pool.query(update_employees_query,
        [req.body.position_id_input, req.body.first_name_input, req.body.last_name_input, req.body.email_input, req.body.address_input, req.body.phone_number_input, req.params.id],
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
// deletes an employee based on the passed url :id param
expressRouter.delete("/:id", function(req, res) {
    let delete_employees_query = "DELETE FROM Employees WHERE employee_id = ?;";
    db.pool.query(delete_employees_query,
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