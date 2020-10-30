import React, { useEffect, useState } from "react";
import API from "../utils/API";

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
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App;
