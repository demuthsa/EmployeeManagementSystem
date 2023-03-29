import { useState, useEffect } from "react";
import axios from "axios";

export const PositionForm = (properties) => {
  
  async function newSubmit() {
    try {
      const res = await axios.post("http://flip3.engr.oregonstate.edu:1819/positions", {
        position_title_input,
        shift_input,
        department_input,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateSubmit() {
    try {
      const res = await axios.put(
        `http://flip3.engr.oregonstate.edu:1819/positions/${properties.row.position_id}`,
        {
          position_title_input,
          shift_input,
          department_input,
        }
      );
      if (res.status === 200) {
        // rerender with latest changes
        properties.parentRerender();
      }
    } catch (error) {
      console.error(error);
      // TODO add user feedback of failure
    }
    properties.showForm(false);
  }

  // State definitions
  const [position_title_input, setPositionTitle] = useState(
    properties.row.position_title ? properties.row.position_title : ""
  );
  const [shift_input, setShift] = useState(
    properties.row.shift ? properties.row.shift : ""
  );
  const [department_input, setDepartment] = useState(
    properties.row.department ? properties.row.department : ""
  );

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
      {properties.row ? (
        <h3>Update position</h3>
      ) : (
        <h3>Add a new position</h3>
      )}

      <form onSubmit={handleSubmit} className="flex-form">
      <label>Position Title</label>
                <select 
                    id="position_title_input"
                    required
                    value={position_title_input} 
                    onChange={(e) => setPositionTitle(e.target.value)}
                >
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
        <button
          type="submit"
          className="pure-button pure-button-primary"
        >
          Submit
        </button>
        <button
          type="button"
          className="pure-button pure-button"
          onClick={() => {
            properties.showForm(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PositionForm;