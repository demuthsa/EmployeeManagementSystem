import { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

export const EmployeeForm = (properties) => {
    console.log(properties);

    async function newSubmit() {
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
        } catch (error) {
            console.error(error);
        }
    }

    async function updateSubmit() {
        if (!validatePhoneNumber(phone_number_input.replace(/[^0-9]/g, ""))) {
            setPhoneError(true);
            return;
        }
        try {
            const res = await axios.put(
                `http://flip3.engr.oregonstate.edu:1819/employees/${properties.row.employee_id}`,
                {
                    position_id_input,
                    first_name_input,
                    last_name_input,
                    email_input,
                    address_input,
                    phone_number_input
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
    const [positionIdOptions, setPositionIdOptions] = useState([]);
    const [position_id_input, setPositionId] = useState(
        properties.row.position_id ? properties.row.position_id : ""
    );
    const [first_name_input, setFname] = useState(
        properties.row.first_name ? properties.row.first_name : ""
    );
    const [last_name_input, setLname] = useState(
        properties.row.last_name ? properties.row.last_name : ""
    );
    const [email_input, setEmail] = useState(
        properties.row.email ? properties.row.email : ""
    );
    const [address_input, setAddress] = useState(
        properties.row.address ? properties.row.address : ""
    );
    const [phone_number_input, setPhoneNumber] = useState(
        properties.row.phone_number ? properties.row.phone_number : ""
    );
    const [phoneError, setPhoneError] = useState(false);
    // Handles valid phone numbers
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

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(phone_number_input.replace(/[^0-9]/g, ""))) {
            setPhoneError(true);
            return;
        }
        if (properties.row) {
            updateSubmit();
        } else {
            newSubmit();
        }
    };

    return (
        <div>
            <h3>Update employee</h3>

            <form
                onSubmit={handleSubmit}
                className="flex-form"
            >
                {/* <label>Position ID</label>
                <select
                    value={position_id_input}
                    onChange={(e) => setPositionId(e.target.value)}
                >
                    <option value="">Select a position ID</option>
                    {positionIdOptions.map((positionId) => (
                        <option key={positionId.id} value={positionId.id}>
                            {positionId.name}
                        </option>
                    ))}
                </select> */}
                <label>Position ID</label>
                <select
                    value={position_id_input}
                    onChange={(e) => setPositionId(e.target.value)}
                >
                    <option value="">Select a position ID</option>
                        {positionIdOptions.map((positionId) => (
                    <option value={positionId.position_id}>id: {positionId.position_id} | {positionId.position_title} | {positionId.shift} | {positionId.department}</option>
                        ))}
                </select>

                {/* <tbody>
                    {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i}/>)}
                </tbody> */}
                
                {/* <select >
                    <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
                        {fruits.map((fruit) => (
                    <option value={fruit.value}>{fruit.label}</option>
                    ))}
                </select> */}

                {/* <label>Position ID</label>
                <input
                    type="text"
                    id="position_id"
                    required
                    value={position_id_input}
                    onChange={(e) => setPositionId(e.target.value)}
                /> */}
                <label>First name</label>
                <input
                    type="text"
                    id="fname"
                    required
                    value={first_name_input}
                    onChange={(e) => setFname(e.target.value)}
                />
                <label>Last name</label>
                <input
                    type="text"
                    required
                    value={last_name_input}
                    onChange={(e) => setLname(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
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
    );
};

export default EmployeeForm;
