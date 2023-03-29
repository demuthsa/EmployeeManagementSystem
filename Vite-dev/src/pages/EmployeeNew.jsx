import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// Input mask component is used for formatting the phone number input with dashes
import InputMask from "react-input-mask";


export const EmployeeNew = () => {
    const [positionIdOptions, setPositionIdOptions] = useState([]);
    const [position_id_input, setPositionId] = useState("");
    const [first_name_input, setFname] = useState("");
    const [last_name_input, setLname] = useState("");
    const [email_input, setEmail] = useState("");
    const [address_input, setAddress] = useState("");
    const [phone_number_input, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState(false);

    const navigate = useNavigate();

    // Function to validate the phone number input
    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
      };


    // Dynamic drop down for positions
    useEffect(() => {
        axios.get("http://flip3.engr.oregonstate.edu:1819/positions") // working on route position for id
          .then(response => {
            setPositionIdOptions(response.data.rows);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://flip3.engr.oregonstate.edu:1819/employees", {
                position_id_input,
                first_name_input,
                last_name_input,
                email_input,
                address_input,
                phone_number_input
            });
            console.log(res);
            navigate("/employees")
        } catch (error) {
            console.error(error);
            // TODO add user feedback of failure
        }
    };


    const handleCancel = () => {
        // Navigate to the employees page when the Cancel button is clicked
        navigate("/employees");
      };

    return (
        <div>
            <h3>Add a new employee</h3>
            <h5>* If your position is not available under Position ID, create a new position first</h5>
            <form onSubmit={handleSubmit} className="flex-form">
                <label>Position ID</label>
                    <select
                    value={position_id_input}
                    onChange={(e) => setPositionId(e.target.value)}
                    >
                    <option value="">Select a position ID</option>
                    {positionIdOptions.map((positionId) => (
                        <option value={positionId.position_id}>
                        id: {positionId.position_id} | {positionId.position_title} |{" "}
                        {positionId.shift} | {positionId.department}
                        </option>
                    ))}
                    </select>  
                <label>First name</label>
                <input
                    type="text"
                    id="fname"
                    required //indicated form cannot be submitted without value
                    value={first_name_input} // sets the value of the input field to the current value of the state variable
                    onChange={(e) => setFname(e.target.value)} // event handler that gets called whenever the user types into the input field. It takes the event object e and extracts the value property from the target object, which represents the input element. It then passes this value to the setFname function, which updates the fname state variable with the new value.
                />
                <label>Last name</label> 
                <input
                    type="text"
                    id="lname"
                    required
                    value={last_name_input}
                    onChange={(e) => setLname(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    required
                    value={email_input}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Address</label>
                <input
                    type="text"
                    value={address_input}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label>Phone Number</label>
                <InputMask
                    mask="999-999-9999"
                    maskChar={null}
                    value={phone_number_input}
                    onChange={(e) => {
                        const phoneNumber = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                        setPhoneNumber(e.target.value);
                        setPhoneError(!validatePhoneNumber(phoneNumber));
                    }}
                >
                    {() => (
                        <input
                            type="tel"
                            id="phone_number"
                            required
                            className={phoneError ? "error" : ""}
                        />
                    )}
                </InputMask>
                {phoneError && <div className="error-message">Please enter a valid 10-digit phone number.</div>}
                <button type="submit" class="pure-button pure-button-primary" disabled={phoneError}>
                    Submit
                </button>
                <button type="submit" onClick={handleCancel}>Cancel</button>

            </form>
            <Link to="/employees">Return to all employees</Link>
        </div>
    );
};

export default EmployeeNew;
