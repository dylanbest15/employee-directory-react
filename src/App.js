import React, { useEffect, useState, useRef } from "react";
import API from "./utils/API";
import EmployeeRow from "./components/EmployeeRow";

function App() {
  const inputRef = useRef();
  // state variables
  const [employees, setEmployees] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  // use effect for api call
  useEffect(() => {
    API.getEmployees().then(employees => {
      setEmployees(employees.results);
    })
  }, []);

  // sort table
  function sortTable() {
    if (sortBy) {
      return employees.sort(function (a, b) {
        var textA = findVal(a, sortBy);
        var textB = findVal(b, sortBy);
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
    return employees
  }

  // sorter helper function found here:
  // https://stackoverflow.com/questions/40603913/search-recursively-for-value-in-object-by-property-name

  function findVal(object, key) {
    var value;
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = findVal(object[k], key);
        return value !== undefined;
      }
    });
    return value;
  }

  // search bar input change
  function handleInputChange() {
    setSearch(inputRef.current.value);
  }

  // search bar filter helper function
  function handleSearch(employee) {
    if (employee.name.first.toLowerCase().includes(search.toLowerCase()) ||
      employee.name.last.toLowerCase().includes(search.toLowerCase()) ||
      employee.phone.includes(search) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.dob.date.includes(search)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Employee Directory</h1>
          <p className="lead">Click on carrots to filter by heading or use the search box to narrow your results.</p>
        </div>
      </div>

      <div className="search-container text-center">
        <input className="form-control search-bar" type="text" placeholder="Search" aria-label="Search"
          ref={inputRef} onChange={handleInputChange} />
      </div>

      <div className="container text-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"
                onClick={() => setSortBy("last")}>Name <button className="btn"><i class="fas fa-sort"></i></button></th>
              <th scope="col"
                onClick={() => setSortBy("phone")}>Phone <button className="btn"><i class="fas fa-sort"></i></button></th>
              <th scope="col"
                onClick={() => setSortBy("email")}>Email <button className="btn"><i class="fas fa-sort"></i></button></th>
              <th scope="col"
                onClick={() => setSortBy("date")}>DOB <button className="btn"><i class="fas fa-sort"></i></button></th>
            </tr>
          </thead>
          <tbody>
            {sortTable().filter(handleSearch).map(employee => (
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
    </>
  )
}

export default App;
