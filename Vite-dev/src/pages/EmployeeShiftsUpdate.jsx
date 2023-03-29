import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeShiftsUpdate() {
    // make an easier variable "row" for the passed state values
    const location = useLocation();
    const row = location.state.row;


    // State for axios employees and shifts dropdowns
    const [employeeIdOptions, setEmployeeIdOptions] = useState([]);
    const [shiftIdOptions, setShiftIdOptions] = useState([]);

    // State for inputs
    const [employee_id_input, setEmployeeId] = useState(row.employee_id);
    const [shift_id_input, setShiftId] = useState(row.shift_id);

    // Dynamic drop down for employees and for Shifts
    useEffect(() => {
        axios.get("http://flip3.engr.oregonstate.edu:1819/employees")
          .then(response => {
            setEmployeeIdOptions(response.data.rows);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    // Dynamic drop down for Shifts
    useEffect(() => {
        axios.get("http://flip3.engr.oregonstate.edu:1819/shifts")
          .then(response => {
            let modified_shifts = response.data.rows;
            modified_shifts.map(row => {
                row.start_date = row.start_date.split('T')[0];
                row.end_date = row.end_date.split('T')[0];
            });
            setShiftIdOptions(modified_shifts);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    
    
    const navigate = useNavigate();

    const handleCancel = () => {
        // Navigate to the Employee_shifts page when the Cancel button is clicked
        navigate("/employee-shifts");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://flip3.engr.oregonstate.edu:1819/employeeshifts/${row.employee_shift_id}`, {
                employee_id_input, 
                shift_id_input
            });
            console.log(res);
            navigate("/employee-shifts")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Update Employee Shifts</h3>

            <form className="flex-form" onSubmit={handleSubmit}>
                <label>Select Employee</label>
                <select
                    value={employee_id_input}
                    onChange={(e) => setEmployeeId(e.target.value)}
                >
                    <option value="">--- Select an Employee ---</option>
                    {employeeIdOptions.map((employee) => (
                        <option value={employee.employee_id}>
                            {employee.first_name} | {employee.last_name} | {employee.department} | {employee.position_title} | {employee.shift}
                        </option>
                    ))}
                </select>

                <label>Select Shift</label>
                <select
                    value={shift_id_input}
                    onChange={(e) => setShiftId(e.target.value)}
                >
                    <option value="">--- Select a Shift ---</option>
                    {shiftIdOptions.map((shift) => (
                        <option value={shift.shift_id}>
                            {shift.day_of_week} | {shift.start_date} | {shift.start_time}
                        </option>
                    ))}
                </select>

                <p>If you do not see the shift you want to select: <Link to="/shiftsnew" >Add a new shift</Link></p>

                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
                <br />
                <Link to="/employee-shifts">Return to Employee-Shifts</Link>

            </form>
        </div>
    );
};
