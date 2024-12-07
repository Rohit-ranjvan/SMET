import axios from "axios";
import React, { useState } from "react";
import { FaUserEdit, FaTrash } from "react-icons/fa";

const EstimateStatisticsTwo = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: 0,
    email: "",
    education: "",
    city: "",
    pinCode: 0,
    landmark: "",
    address: "",
    reference: "",
    groupName: "",
    teamLeader: true,
    aygcode: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  // Toggle form visibility
  const toggleForm = () => setFormVisible(!formVisible);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const { firstName, lastName, email } = formData;
    if (!firstName || !lastName || !email) {
      alert("First Name, Last Name, and Email are required!");
      return false;
    }
    return true;
  };

  // Submit form data to the Register Youth API
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/API/V1/REGISTER_YOUTH`,
        formData
      );

      // Update the table data
      if (editIndex !== null) {
        const updatedData = [...tableData];
        updatedData[editIndex] = formData;
        setTableData(updatedData);
        setEditIndex(null);
      } else {
        setTableData([...tableData, formData]);
      }

      alert("Youth registered successfully!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register youth. Please try again.");
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      mobileNumber: 0,
      email: "",
      education: "",
      city: "",
      pinCode: 0,
      landmark: "",
      address: "",
      reference: "",
      groupName: "",
      teamLeader: true,
      aygcode: "",
    });
    setFormVisible(false);
  };

  // Handle row deletion
  const handleDelete = (index) => {
    const filteredData = tableData.filter((_, i) => i !== index);
    setTableData(filteredData);

    if (filteredData.length % rowsPerPage === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle row editing
  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setEditIndex(index);
    setFormVisible(true);
  };

  // Export table data to CSV
  const handleExport = () => {
    const csvData = [
      Object.keys(tableData[0] || {}).join(","),
      ...tableData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_data.csv";
    link.click();
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={toggleForm}>
          {formVisible ? "Close Form" : "Register Youth"}
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          Export to CSV
        </button>
      </div>

      {formVisible && (
        <div className="card mb-4">
          <div className="card-header text-center bg-primary text-white">
            <h4 className="mb-0">Youth Registration Form</h4>
          </div>
          <div className="card-body">
            {Object.keys(formData).map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label text-capitalize">{key}</label>
                <input
                  type="text"
                  className="form-control"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-success" onClick={handleSubmit}>
              {editIndex !== null ? "Update" : "Register"}
            </button>
          </div>
        </div>
      )}

      {tableData.length > 0 && (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
              <tr>
                {Object.keys(formData).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      title="Edit"
                      onClick={() => handleEdit(index + indexOfFirstRow)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      title="Delete"
                      onClick={() => handleDelete(index + indexOfFirstRow)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center mt-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      pageNumber === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default EstimateStatisticsTwo;
