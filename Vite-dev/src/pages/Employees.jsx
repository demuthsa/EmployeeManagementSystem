import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, _ } from "gridjs-react";
import axios from "axios";
import { EmployeeForm } from "./EmployeeForm";
import { MdEdit, MdDeleteForever } from "react-icons/md";

// Fetch and return data array of employees from API
async function fetchEmployees() {
    const employees = await axios.get("http://flip3.engr.oregonstate.edu:1819/employees");
    return employees.data.rows;
}

export default function Employees() {
    // employees state
    const [employees, setEmployees] = useState(
        async () => await fetchEmployees()
    );

    function fetchAndSetEmployees() {
        setEmployees(async () => await fetchEmployees());
    }

    // 'showForm' is a boolean state variable used to control the visibility of a form for assing or editing employee data
    // When set to 'true' form is displayed
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null);

    // Delete function
    async function handleDelete(row) {
        if (
            window.confirm(
                `Are you sure you want to DELETE the record for employee ID = ${row.employee_id}?`
            ) === true
        ) {
            let deleted = await axios.delete(
                `http://flip3.engr.oregonstate.edu:1819/employees/${row.employee_id}`
            );
            if (deleted.status === 200) {
                fetchAndSetEmployees();
            }
        }
    }

    // // new edit function
    // const navigate = useNavigate(); // imported from react-router-dom
    // const onEdit = (row) => {
    //     // setExerciseToEdit(row); // possibly need to set state?
    //     // navigate("/editemployee");
    //     navigate("/employeeform");

    // };

    // Edit function
    function handleEdit(row) {
        setFormData(row);
        setShowForm(true);
    }

    // component render
    return (
        <div>
            <h3>Employees</h3>
            <Link to="/EmployeeNew">
                <button className='green-btn' type="button">
                    Add new Employee
                </button>
            </Link>
            <br />
            <br />
            {showForm ? (
                <EmployeeForm
                    row={formData}
                    showForm={setShowForm}
                    // rerender the page when changes are made
                    parentRerender={() => fetchAndSetEmployees()}
                ></EmployeeForm>
            ) : null}
            <Grid
                columns={[
                    {
                        name: "Employee ID",
                        id: "employee_id",
                        sort: true,
                        width: "8%",
                    },
                    { name: "First Name", id: "first_name", sort: true },
                    { name: "Last Name", id: "last_name", sort: true },
                    {
                        name: "Position ID",
                        id: "position_id",
                    },
                    { name: "Position Title", id: "position_title" },
                    { name: "Shift", id: "shift" },
                    { name: "Department", id: "department" },
                    { name: "Email", id: "email" },
                    { name: "Phone Number", id: "phone_number"},
                    { name: "Address", id: "address" },
                    {
                        name: "Edit Item",
                        data: (row) =>
                        // This is broken????
                            _(<MdEdit onClick={() => handleEdit(row)} />), // commented out
                            // _(<MdEdit onClick={() => onEdit(row)} />), // added by zac, might fix?

                        width: "6%",
                    },
                    {
                        name: "Delete Item",
                        data: (row) =>
                            _(
                                <MdDeleteForever
                                    onClick={() => handleDelete(row)}
                                />
                            ),
                        width: "6%",
                    },
                ]}
                data={async () => await employees}
                search={true}
                pagination={{ limit: 25 }}
            />

        </div>
    );
}