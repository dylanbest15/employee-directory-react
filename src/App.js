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
        <div className="container text-center">
          <h1 className="display-4">Employee Directory</h1>
          <p className="lead">Click on carrots to filter by heading or use the search box to narrow your results.</p>
        </div>
      </div>

      <div className="search-container text-center">
        <input class="form-control search-bar" type="text" placeholder="Search" aria-label="Search" />
      </div>

      <div className="container text-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name <i class="fas fa-sort"></i></th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <EmployeeRow
                image={employee.picture.medium}
                name={employee.name.first + " " + employee.name.last}
                phone={employee.phone}
                email={employee.email}
                dob={employee.dob.date.slice(5, 10) + "-" + employee.dob.date.slice(0, 4)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </EmployeeContext.Provider>
  )
}

export default App;
