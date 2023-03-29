import { useState } from "react";
// Use Navigate when switching pages as a result of another action (think dynamic)
// Use Link when no action needs to happen before you can show the page (think static)
import { Link, useNavigate } from "react-router-dom";
// The _ identifier is used as a namespace import, which means that all exports from "gridjs-react" are available under the _ object.
import { Grid, _ } from "gridjs-react";
import axios from "axios";
import { TimeOffRequestForm } from "./TimeOffRequestForm"
import { MdEdit, MdDeleteForever } from "react-icons/md";


// Fetch and return data array of employees from API
async function fetchTimeOffRequests() {
    const timeOffRequests = await axios.get("http://flip3.engr.oregonstate.edu:1819/timeoffrequests");
    // timeOffRequests.data refers to the response object returned by 'axios.get'
    // this object has a 'data' property that contains the response data, the 'rows' property within the 'data' property represents an array of objects that contains the individual time of request records.
    return timeOffRequests.data.rows;
}

export default function TimeOffRequests() { 

    // Time off requests state
    // timeOffRequests set to the intial value of calling fetchTimeOffRequests()
    const [timeOffRequests, setTimeOffRequests] = useState(
        async () => await fetchTimeOffRequests()
    );
    // fetchAndSetTimeOffRequests() used to update the state of timeOffRequests by calling setTimeOffRequests with new state value
    function fetchAndSetTimeOffRequests() {
        setTimeOffRequests(async () => await fetchTimeOffRequests());
    }

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null);

    // Delete function
    async function handleDelete(row) {
        if (
            window.confirm(
                `Are you sue you want to DELETE the record for request ID= ${row.request_id}?`
            ) === true
        ) {
            let deleted = await axios.delete(
                `http://flip3.engr.oregonstate.edu:1819/timeoffrequests/${row.request_id}`
            );
            if (deleted.status === 200) {
                fetchAndSetTimeOffRequests();
            }
        }
    }

    // Edit function
    function handleEdit(row) {
        setFormData(row); // sets the intial values of the form fields
        setShowForm(true); // shows the form page in the UI
    }

    return (
        <div>
            <h3>Time Off Requests</h3>
            <Link to="/TimeOffRequestNew">
                <button className='green-btn' type="button">
                    Add new Time off request
                </button>
            </Link>
            <br />
            <br />
            {showForm ? (
                <TimeOffRequestForm
                    row={formData}
                    showForm={setShowForm}
                    parentRerender={() => fetchAndSetTimeOffRequests()}
                ></TimeOffRequestForm>
            ) : null}
            <Grid
                columns={[
                    {
                        name: "Request ID",
                        id: "request_id",
                        sort: true,
                        width: "8",
                    },
                    {
                        name: "Employee ID",
                        id: "employee_id",
                        sort: true,
                    },
                    {
                        name: "First Name",
                        id: "first_name",
                        sort: true,
                    },
                    {
                        name: "Last Name",
                        id: "last_name",
                        sort: true,
                    },
                    {
                        name: "Date",
                        id: "date",
                        formatter: (cell) => cell.slice(0, 10),
                    },
                    {
                        name: "Status",
                        id: "status",
                    },
                    {
                        name: "Edit Item",
                        data: (row) =>
                            _(<MdEdit onClick={() => handleEdit(row)} />),
                        width: "8%",
                    },
                    {
                        name: "Delete Item",
                        data: (row) => // Commented out Delete function, just add it back in when ready
                            _(<MdDeleteForever onClick={() => handleDelete(row)}/>),
                        width: "8%",
                    },
                ]}
                data={async () => await timeOffRequests}
                search={true}
                pagination={{ limit: 25 }}
            />


        </div>
    );
}

