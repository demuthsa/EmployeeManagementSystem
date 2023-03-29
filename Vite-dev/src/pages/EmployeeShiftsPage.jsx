import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { Grid, _ } from "gridjs-react";

// Fetch and return data array of Employee_shifts from API
async function fetchEmployeeShifts() {
    const unmodified_employee_shifts = await axios.get("http://flip3.engr.oregonstate.edu:1819/employeeshifts");
    // Stackoverflow post about splitting date return to get rid of Time appended at end of date
    // https://stackoverflow.com/questions/74193747/mysql-returns-the-date-in-this-format-yyyy-mm-ddt000000-000z-i-want-it-in-y
    let modified_employee_shifts = unmodified_employee_shifts.data.rows;
    modified_employee_shifts.map(row => {
        row.start_date = row.start_date.split('T')[0];
        row.end_date = row.end_date.split('T')[0];
    });
    return modified_employee_shifts;
}

export default function EmployeeShifts() {
    // employee_shifts state
    const [employee_shifts, setEmployeeShifts] = useState(
        async () => await fetchEmployeeShifts()
    );

    function fetchAndSetEmployeeShifts() {
        setEmployeeShifts(async () => await fetchEmployeeShifts());
    }

    // Delete func
    async function handleDelete(row) {
        if (window.confirm(`Are you sure you want to DELETE the record for employee_shift ID = ${row.employee_shift_id}?`) === true) {
            let deleted = await axios.delete(`http://flip3.engr.oregonstate.edu:1819/employeeshifts/${row.employee_shift_id}`);
            if (deleted.status === 200) {
                fetchAndSetEmployeeShifts();
            }
        }
    }

    // see stack overflow for useNavigate: https://stackoverflow.com/a/70010073
    const navigate = useNavigate();
    function handleEdit(row) {
        navigate('/employee-shifts-update',{state:{row:row}});
    }

    return (
        <div>
            <h3>Employee_shifts Intersection Table</h3>

            <Link to="/employee-shifts-new">
                <button className='green-btn' type="button">
                    Add new employee-shift
                 </button>
            </Link>
            <br />
            <br />
            <Grid
                columns={[
                    { name: "Employee Shift ID", id: "employee_shift_id", sort: true },
                    { name: "Employee ID", id: "employee_id", sort: true },
                    { name: "First Name", id: "first_name", sort: true },
                    { name: "Last Name", id: "last_name", sort: true },
                    { name: "Shift ID", id: "shift_id", sort: true },
                    { name: "Day", id: "day_of_week", sort: true },
                    { name: "Start Date", id: "start_date", sort: true },
                    { name: "End Date", id: "end_date", sort: true },
                    { name: "Start Time", id: "start_time", sort: true },
                    { name: "End Time", id: "end_time", sort: true },
                    {
                        name: "Edit Item",
                        data: (row) => _(<MdEdit onClick={() => handleEdit(row)} />),
                            // the '_' allows you to import components inside a gridjs cell like this _(<reactComponent/>)
                            // see: https://gridjs.io/docs/examples/react-cells
                        width: "6%",
                    },
                    {
                        name: "Delete Item",
                        data: (row) => _(<MdDeleteForever onClick={() => handleDelete(row)}/>),
                        width: "6%",
                    },
                ]}
                data={async () => await employee_shifts}
                search={true}
                pagination={{ limit: 25 }}
            />
            
        </div>
    );
}
