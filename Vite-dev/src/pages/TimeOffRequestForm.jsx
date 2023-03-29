import { useState } from 'react';
import axios from 'axios';

export const TimeOffRequestForm = (properties) => {
    
    // CREATE function
    async function newSubmit() {
        try {
            const res = await axios.post("http://flip3.engr.oregonstate.edu:1819/timeoffrequests", {
                employee_id_input,
                date_input
            });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    
    // UPDATE function
    async function updateSubmit() {
        try {
            const res = await axios.put(
                `http://flip3.engr.oregonstate.edu:1819/timeoffrequests/${properties.row.request_id}`,
                {
                    status_input
                }
            );
            if (res.status === 200) {
                // rerender with latest changes
                properties.parentRerender();
            }
        } catch (error) {
            console.error(error);
        }
        // called to hide the form once the update is complete
        properties.showForm(false);
    }

    // State definitions
    const [employee_id_input, setEmployeeId] = useState(
        properties.row.employee_id ? properties.row.employee_id : ""
    );
    const [first_name_input, setFname] = useState(
        properties.row.first_name ? properties.row.first_name : ""
    );
    const [last_name_input, setLname] = useState(
        properties.row.last_name ? properties.row.last_name : ""
    );
    const [date_input, setDate] = useState(
        properties.row.date ? properties.row.date : ""
    );
    const [status_input, setStatus] = useState(
        properties.row.status ? properties.row.status : ""
    );
    
    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (properties.row) {
            updateSubmit();
        } else {
            newSubmit();
        }
    };

    return (
        <div>
            {properties.row ? <h3>Update time off request</h3> : <h3>Add new time off request</h3>}

            <form
                onSubmit={handleSubmit} className="flex-form">

                <label>Employee ID (read only)</label>
                <input
                    type="int"
                    required
                    value={employee_id_input}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    readOnly
                />
                <label>First name (read only)</label>
                <input
                    type="text"
                    id="fname"
                    required
                    value={first_name_input}
                    onChange={(e) => setFname(e.target.value)}
                    readOnly
                />
                <label>Last name (read only)</label>
                <input
                    type="text"
                    required
                    value={last_name_input}
                    onChange={(e) => setLname(e.target.value)}
                    readOnly
                />
                <label>Date (read only)</label>
                <input
                    type="text"
                    value={date_input}
                    onChange={(e) => setDate(e.target.value)}
                    readOnly
                />
                <label>Status</label>
                    <select
                        value={status_input}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">--- Select a status ---</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="denied">Denied</option>
                    </select>
                    
                <button type="submit" class="pure-button pure-button-primary">
                    Submit
                </button>
                <button
                    type="button"
                    class="pure-button pure-button"
                    onClick={() => {
                        properties.showForm(false);
                    }}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
};


export default TimeOffRequestForm;