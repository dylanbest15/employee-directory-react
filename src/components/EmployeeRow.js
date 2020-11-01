import React, { useContext } from "react";
// import EmployeeContext from "../utils/employeeContext";

function EmployeeRow(props) {
  // const { employees } = useContext(EmployeeContext);

  return (
    <tr>
      <td>
        <div className="img-container">
          <img alt={props.name} src={props.image} />
        </div>
      </td>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props.dob}</td>
    </tr>
  )
}

export default EmployeeRow;