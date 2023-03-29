import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const RequestNew = () => {
    const [employee_id_input, setEmployeeId] = useState("");
    const [date_input, setDate] = useState("");
    const [status_input, setStatus] = useState("");

    // Add the missing state for employee_idOptions
    const [employee_idOptions, setEmployeeIdOptions] = useState([]);


    const navigate = useNavigate();

    // function to fetch the employees
    const fetchEmployees = async () => {
        try {
            const res = await axios.get("http://flip3.engr.oregonstate.edu:1819/employees");
            setEmployeeIdOptions(res.data.rows);
        } catch (error) {
            console.error(error);
        }
    };
    
    // fetch the employees when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://flip3.engr.oregonstate.edu:1819/timeoffrequests", {
                employee_id_input,
                date_input,
                status_input
            });
            console.log(res);
            navigate("/time-off-requests")
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate("/time-off-requests");
    };

    // Get the current date as a string in the format "YYYY-MM-DD"
    const currentDate = new Date().toISOString().slice(0, 10);

    return (
        <div>
            <h3>Add a new request</h3>
            <form onSubmit={handleSubmit} className="flex-form">
                <label>Employee ID</label>
                    <select
                        id="employee_id"
                        required
                        value={employee_id_input}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    >
                        <option value="">Select an employee</option>
                        {employee_idOptions.map((employee) => (
                            <option key={employee.employee_id} value={employee.employee_id}>
                                {employee.first_name} {employee.last_name}
                            </option>
                        ))}
                    </select>
                    <label>Date</label> 
                    <input
                        type="date"
                        id="date"
                        required
                        value={date_input}
                        onChange={(e) => setDate(e.target.value)}
                        min={currentDate}
                    />
                    {/* <label>Status</label>
                    <input
                        type="text"
                        id="status"
                        required
                        value={status_input}
                        onChange={(e) => setStatus(e.target.value)}
                    /> */}

                    <button type="submit" class="pure-button pure-button-primary">
                    Submit
                    </button>
                    <button type="cancel" onClick={handleCancel}>Cancel</button>
            </form>
            <Link to="/time-off-requests">Return to all requests</Link>
        </div>
    );
};

export default RequestNew;
