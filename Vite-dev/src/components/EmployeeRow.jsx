import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { GrFormEdit, GrFormClose } from "react-icons/gr";

function EmployeeRow({ employee }) {
    return (
        <tr>
            <td>{employee.employee_id}</td>
            <td>{employee.position_id}</td>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone_number}</td>
            <td><MdDeleteForever  /></td>
            <td><MdEdit  /></td>
        </tr>
    );
}

export default EmployeeRow;