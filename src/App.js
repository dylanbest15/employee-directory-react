import React, { useEffect, useState } from "react";
import API from "./utils/API";
import EmployeeContext from "./utils/employeeContext";
import EmployeeRow from "./components/EmployeeRow";

function App() {
  // state variables
  const [employees, setEmployees] = useState([]);

  // use effect for api call
  useEffect(() => {
    API.getEmployees().then(employees => {
      setEmployees(employees.results);
    })
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees }}>

      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Employee Directory</h1>
          <p className="lead">Click on carrots to filter by heading or use the search box to narrow your results.</p>
        </div>
      </div>

      <div className="container">
        <form className="form-inline">
          <i className="fas fa-search" aria-hidden="true"></i>
          <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
            aria-label="Search"></input>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <EmployeeRow
                image={employee.picture.thumbnail}
                name={employee.name.first + employee.name.last}
                phone={employee.phone}
                email={employee.email}
                dob={employee.dob.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </EmployeeContext.Provider>
  )
}

export default App;
