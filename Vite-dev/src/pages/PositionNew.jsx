import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const PositionsNew = (properties) => {
    
    // State definitions
    const [position_title_input, setPositionTitle] = useState("");
    const [shift_input, setShift] = useState("");
    const [department_input, setDepartment] = useState("");

    const navigate = useNavigate();

    //SUBMIT
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://flip3.engr.oregonstate.edu:1819/positions", {
                position_title_input,
                shift_input,
                department_input
            });
            console.log(res);
            navigate("/positions");
        } catch (error) {
            console.error(error);
        }
    }

    //CANCEL
    const handleCancel = () => {
        // Navigate to the employees page when the Cancel button is clicked
        navigate("/positions");
      };

    return (
        <div>
            <h3>Add new position</h3>

            <form
                className="flex-form"
                onSubmit={handleSubmit}>
                
                <label>Position Title</label>
                <select 
                    id="position_title_input"
                    required
                    value={position_title_input} 
                    onChange={(e) => setPositionTitle(e.target.value)}
                >
                    <option value="">Select a position</option>
                    <option value="charge">Charge</option>
                    <option value="nurse">Nurse</option>
                    <option value="cna">CNA</option>
                    <option value="physician">Physician</option>
                </select>
                <label>Shift</label>
                <select 
                    id="shift_input"
                    required
                    value={shift_input} 
                    onChange={(e) => setShift(e.target.value)}
                >
                    <option value="">Select a shift</option>
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                </select>
                <label>Department</label>
                <select 
                    id="department_input"
                    required
                    value={department_input} 
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">Select a department</option>
                    <option value="ER">ER</option>
                    <option value="ICU">ICU</option>
                    <option value="OR">OR</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="OBGYN">OBGYN</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Physical_therapy">Physical Therapy</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Lab">Lab</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Respiratory_therapy">Respiratory Therapy</option>
                </select>
            
                <button type="submit" class="pure-button pure-button-primary">
                    Submit
                </button>
                <button type="button" class="pure-button pure-button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default PositionsNew;