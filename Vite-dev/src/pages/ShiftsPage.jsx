import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { Grid, _ } from "gridjs-react";

// Fetch and return data array of Shifts from API
async function fetchShifts() {
    const unmodified_shifts = await axios.get("http://flip3.engr.oregonstate.edu:1819/shifts");
    // Stackoverflow post about splitting date return to get rid of Time appended at end of date
    // https://stackoverflow.com/questions/74193747/mysql-returns-the-date-in-this-format-yyyy-mm-ddt000000-000z-i-want-it-in-y
    let modified_shifts = unmodified_shifts.data.rows;
    modified_shifts.map(row => {
        row.start_date = row.start_date.split('T')[0];
        row.end_date = row.end_date.split('T')[0];
    });
    return modified_shifts;
}

export default function Shifts() {
    // shifts state
    const [shifts, setShifts] = useState(
        async () => await fetchShifts()
    );

    function fetchAndSetShifts() {
        setShifts(async () => await fetchShifts());
    }

    // Delete func
    async function handleDelete(row) {
        if (window.confirm(`Are you sure you want to DELETE the record for shift ID = ${row.shift_id}?`) === true) {
            let deleted = await axios.delete(`http://flip3.engr.oregonstate.edu:1819/shifts/${row.shift_id}`);
            if (deleted.status === 200) {
                fetchAndSetShifts();
            }
        }
    }
    
    // see stack overflow for useNavigate: https://stackoverflow.com/a/70010073
    const navigate = useNavigate();
    function handleEdit(row) {
        navigate('/shiftsupdate',{state:{row:row}});
    }

    // component render
    return (
        <div>
            <h3>Shifts</h3>
            <Link to="/shiftsnew">
                <button className='green-btn' type="button">
                    Add new shift
                 </button>
            </Link>
            <br />
            <br />

            <Grid
                columns={[
                    { name: "Shift ID", id: "shift_id", sort: true },
                    { name: "Day", id: "day_of_week", sort: true },
                    { name: "Start Date", id: "start_date", sort: true },
                    { name: "End Date", id: "end_date", sort: true },
                    { name: "Start Time", id: "start_time", sort: true },
                    { name: "End Time", id: "end_time", sort: true },
                    {
                        name: "Edit Item",
                        data: (row) => _(<MdEdit onClick={() => handleEdit(row)} />),
                        width: "8%",
                    },
                    {
                        name: "Delete Item",
                        data: (row) => _(<MdDeleteForever onClick={() => handleDelete(row)}/>),
                        // the '_' allows you to import components inside a gridjs cell like this _(<reactComponent/>)
                        // see: https://gridjs.io/docs/examples/react-cells
                        width: "8%",
                    },
                ]}
                data={async () => await shifts}
                search={true}
                pagination={{ limit: 25 }}
            />
        </div>
    );
}
