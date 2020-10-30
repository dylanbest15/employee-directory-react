import React, { useEffect, useState } from "react";
import API from "./utils/API";
import EmployeeContext from "./utils/employeeContext";

function App() {
  // state variables
  const [employees, setEmployees] = useState([]);

  // use effect for api call
  useEffect(() => {
    API.getEmployees().then(employees => {
      setEmployees(employees);
    })
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees }}>
      <div>
        <h1>Hello</h1>
      </div>
    </EmployeeContext.Provider>
  )
}

export default App;
