import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const RegisterYouth = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: "",  
    aygcode: "", 
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
  });
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const savedData = localStorage.getItem("youthData");
    if (savedData) {
      setTableData(JSON.parse(savedData)); 
    } else {
      fetchYouthData();
    }
  }, []);

  // Function to fetch youth data from API
  const fetchYouthData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SOME_KEY}/API/V1/GET_ALL_YOUTHS`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setTableData(response.data); 
      localStorage.setItem("youthData", JSON.stringify(response.data)); 
    } catch (error) {
      console.error("Error fetching youth data:", error);
    }
  };

  
  const [tableData, setTableData] = useState([]);

  
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

  // Toggle the visibility of the form modal
  const toggleForm = () => setFormVisible(!formVisible);

  // Register or update youth in the database
  const registerYouth = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/API/V1/REGISTER_YOUTH`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Youth registered successfully", response);
      // Update the table data after successful registration
      setTableData([...tableData, formData]);
      localStorage.setItem("youthData", JSON.stringify([...tableData, formData])); // Update localStorage
      alert("Youth registered successfully!");
      resetForm();
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register youth. Please try again.");
    }
  };

  // Reset the form after successful submission
  const resetForm = () => {
    setFormData({
      id: "",
      aygcode: "",
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
    });
    setFormVisible(false); // Close the modal
  };

  // Delete youth data
  const handleDelete = (index) => {
    const filteredData = tableData.filter((_, i) => i !== index);
    setTableData(filteredData);
    localStorage.setItem("youthData", JSON.stringify(filteredData)); // Update localStorage after delete
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={() => setFormVisible(true)}>
          Register Youth
        </button>
      </div>

      {/* Modal for Youth Registration Form */}
      <Modal show={formVisible} onHide={resetForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Youth" : "Register Youth"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Close
          </Button>
          <Button variant="primary" onClick={registerYouth}>
            {editIndex !== null ? "Update" : "Register"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Youth Data Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary text-center text-white">
            <tr>
              <th>ID</th>
              <th>Aygcode</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>MobileNumber</th>
              <th>Email</th>
              <th>Education</th>
              <th>City</th>
              <th>PinCode</th>
              <th>Landmark</th>
              <th>Address</th>
              <th>Reference</th>
              <th>GroupName</th>
              <th>TeamLeader</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.aygcode}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.mobileNumber}</td>
                <td>{data.email}</td>
                <td>{data.education}</td>
                <td>{data.city}</td>
                <td>{data.pinCode}</td>
                <td>{data.landmark}</td>
                <td>{data.address}</td>
                <td>{data.reference}</td>
                <td>{data.groupName}</td>
                <td>{data.teamLeader ? "Yes" : "No"}</td>
                <td className="text-center d-flex">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    title="Edit"
                    onClick={() => {
                      setEditIndex(index);
                      setFormData(data); // Fill form data for editing
                      setFormVisible(true); // Open the modal
                    }}
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Delete"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RegisterYouth;
