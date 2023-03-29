import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
// https://day.js.org/docs/en/display/format
// Use dayjs to manipulate various date objects easily

export default function ShiftsNew() {
    const [day_of_week_input, setDay] = useState("");
    const [start_date_input, setStartDate] = useState("");
    const [end_date_input, setEndDate] = useState("");
    const [start_time_input, setStartTime] = useState("");
    const [end_time_input, setEndTime] = useState("");
    const [shift_input, setShift] = useState("");

    const navigate = useNavigate();

    const handleDayChange = (value) => {
        // <select> html elements dont have a "readOnly" like the other inputs below have activated, 
        // so we use this function to reset the other form inputs if Day value is changed. This is because
        // the start_date and shift inputs manipulate and validate the other inputs to match/normalize data
        // When a start date is selected, the Day value will match that dates day (I love dayjs module)
        // but if the Day value is manually changed by the user it will no longer match the date... so we just reset the form instead.

        setDay(value);
        setStartDate("");
        setEndDate("");
        setStartTime("");
        setEndTime("");
        setShift("");
    };

    const incrementEndDate = (date) => {
        // increments end date by 1 day with dayjs
        let next_date = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
        setEndDate(next_date);
    };

    const handleDateAndDay = (value) => {
        setStartDate(value); // set the start date state to the inputted value of the form date input

        if (shift_input === "" || shift_input === "day") {
            setEndDate(value); // if no shift input or shift input is day, set end date to the same as start date (value)
        }
        if (shift_input === "night") {
            incrementEndDate(value); // if shift input has already been selected, increment end date by 1
        }

        // uses dayjs to set the day of the week, super cool function!
        let datejs_string = dayjs(value).format('ddd');
        
        // looks for dayjs 'ddd' string format and sets state for day_of_week_input to proper sql required string from DDL
        switch (datejs_string) {
            case 'Sun':
                setDay("sun");
                break;
            case 'Mon':
                setDay("mon");
                break;
            case 'Tue':
                setDay("tues");
                break;
            case 'Wed':
                setDay("wed");
                break;
            case 'Thu':
                setDay("thurs");
                break;
            case 'Fri':
                setDay("fri");
                break;
            case 'Sat':
                setDay("sat");
                break;
            default:
                console.log(`default switch activated setDay("");`);
                setDay("");
            }
    };
    
    const assignShiftVals = (value) => {
        // Sets the start_time_input and end_time_input appropriately after a shift is selected in the input
        setShift(value);
        if (value === "day") {
            setStartTime("08:00:00");
            setEndTime("20:00:00");
            // sets end date to equal start date because this is a day shift
            setEndDate(start_date_input);
        }
        if (value === "night") {
            setStartTime("20:00:00");
            setEndTime("08:00:00");
            if (end_date_input !== "" && end_date_input === start_date_input) {
                // if end date state is set (not "") AND end date === start date increment the end date because this is night shift 
                incrementEndDate(end_date_input);
            }
        }
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://flip3.engr.oregonstate.edu:1819/shifts", {
                day_of_week_input,
                start_date_input,
                end_date_input,
                start_time_input,
                end_time_input
            });
            console.log(res);
            navigate("/shifts")
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        // Navigate to the shifts page when the Cancel button is clicked
        navigate("/shifts");
      };

    return (
        <div>
            <h3>Add a New Shift</h3>
            <form onSubmit={handleSubmit} class="flex-form">
                
                <label htmlFor="start_date">Start Date <br /> (Sets 'End Date' and 'Day' automatically)</label> 
                <input 
                    type="date"
                    id="start_date"
                    required
                    value={start_date_input}
                    onChange={(e) => handleDateAndDay(e.target.value)}
                />
               
                <label htmlFor="end_date">End Date (read only)</label>
                <input 
                    type="date"
                    id="end_date"
                    required
                    value={end_date_input}
                    readOnly
                    onChange={(e) => setEndDate(e.target.value)}
                />
               <br />

               <label htmlFor="day_of_week">Day <br /> (Changing will reset the form)</label>
                <select
                    value={day_of_week_input} // sets the value of the input field to the current value of the state variable
                    id="day_of_week"
                    required // requires user to write a value
                    onChange={(e) => handleDayChange(e.target.value)}
                >
                    <option value="">--- Select a day of the week ---</option>
                    <option value="sun">Sunday</option>
                    <option value="mon">Monday</option>
                    <option value="tues">Tuesday</option>
                    <option value="wed">Wednesday</option>
                    <option value="thurs">Thursday</option>
                    <option value="fri">Friday</option>
                    <option value="sat">Saturday</option>
                </select>
                
               <br />
                <label htmlFor="start_time">Start Time (read only)</label>
                <input
                    type="time" 
                    id="start_time"
                    value={start_time_input}
                    onChange={(e) => setStartTime(e.target.value)}
                    readOnly
                />

                <label htmlFor="end_time">End Time (read only)</label>
                <input 
                    type="time"
                    id="end_time"
                    required
                    value={end_time_input}
                    readOnly
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <label htmlFor="shift">Shift (sets the times automatically)</label>
                <select
                    value={shift_input}
                    id="shift"
                    required
                    onChange={(e) => assignShiftVals(e.target.value)}
                >
                    <option value="">--- Select a shift (Day / Night) ---</option>
                    <option value="day">Day Shift</option>
                    <option value="night">Night Shift</option>
                </select>
                <br />
                <button type="submit">
                    Submit
                </button>
                <br />
                <button type="submit" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
            <br />
            <Link to="/shifts">Return to all shifts</Link>
        </div>
    );
};
