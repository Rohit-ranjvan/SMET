import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCity, FaMapMarkerAlt, FaMapPin, FaAddressCard, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Addcenter = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    landmark: "",
    address: "",
    centerhead:"",
  });

  const [centers, setCenters] = useState([]); // Stores the centers
  const [showForm, setShowForm] = useState(false); // Toggles the form visibility
  const [editMode, setEditMode] = useState(false); // Tracks if we are editing
  const [editIndex, setEditIndex] = useState(null); // Index of the center being edited
  const userToken = localStorage.getItem('token');
  console.log("Token getItem", userToken);
  // Load centers from localStorage on component mount
  useEffect(() => {
    const savedCenters = JSON.parse(localStorage.getItem("centers"));
    if (savedCenters) {
      setCenters(savedCenters);
    }
  }, []);

  // Save centers to localStorage whenever centers array changes
  useEffect(() => {
    localStorage.setItem("centers", JSON.stringify(centers));
  }, [centers]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission


  const centeradd = (e) => {
    e.preventDefault();
  
    // const apiUrl = "http://137.184.44.26:9091/API/V1/ADD_CENTER";
  
    axios
      .post(`${import.meta.env.VITE_SOME_KEY}/API/V1/ADD_CENTER`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Add the token to the Authorization header
          "Content-Type": "application/json", // Add any additional headers if needed
        },
      })
      .then((response) => {
        // Check the API response
        if (response.status === 200 || response.status === 201) {
          alert("Center added successfully!");
  
          if (editMode) {
            // Update existing center in local state
            const updatedCenters = centers.map((center, index) =>
              index === editIndex ? formData : center
            );
            setCenters(updatedCenters);
          } else {
            // Add new center to local state
            setCenters([...centers, formData]);
          }
  
          // Reset form and close it
          setFormData({
            name: "",
            city: "",
            pincode: "",
            landmark: "",
            address: "",
            centerhead: "",
          });
          setShowForm(false);
          setEditMode(false);
          setEditIndex(null);
        } else {
          alert("Failed to add center. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error adding center:", error);
        alert("An error occurred. Please check the server or your connection.");
      });
  };
  


  // Handle deleting a center
  const handleDelete = (index) => {
    const updatedCenters = centers.filter((_, i) => i !== index);
    setCenters(updatedCenters);
  };

  // Handle editing a center
  const handleEdit = (index) => {
    setFormData(centers[index]); // Pre-fill form with existing data
    setEditMode(true);
    setShowForm(true);
    setEditIndex(index);
  };

  return (
    <div className="container mt-1">
      <button
        className={`btn ${showForm ? "btn-danger" : "btn-primary"} mb-4`}
        onClick={() => {
          setShowForm(!showForm);
          setEditMode(false); // Ensure we are in "Add" mode, not edit
          setFormData({ name: "", city: "", pincode: "", landmark: "", address: "" }); // Reset form
        }}
      >
        {showForm ? <FaTimes className="me-2"/> : <FaPlus className="me-2"/>} {showForm ? "Close Form" : "Add Center"}
      </button>

      {showForm && (
        <div className="card shadow-lg p-4">
          <h3 className="card-title text-center text-primary mb-4">
            {editMode ? "Edit Center" : "Add New Center"}
          </h3>
          <form onSubmit={centeradd}>
            <div className="mb-3">
              <label className="form-label">
                <FaAddressCard className="me-2 text-secondary fs-6" />
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
              <FaCity className="me-2 text-secondary fs-6" />
                City
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaMapPin className="me-2 text-secondary fs-6" />
                Pincode
              </label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaMapMarkerAlt className="me-2 text-secondary fs-6" />
                Landmark
              </label>
              <input
                type="text"
                className="form-control"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">
                <FaAddressCard className="me-2 text-secondary fs-6" />
                Address
              </label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2 text-secondary fs-6" />
                CenterHead
              </label>
              <input
                type="text"
                className="form-control"
                name="centerhead"
                value={formData.centerhead}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100" onClick={centeradd}>
              {editMode ? "Save Changes" : "Add Center"}
            </button>
          </form>
        </div>
      )}

      <div className="row mt-4">
        {centers.map((center, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card shadow-lg h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title text-primary">{center.name}</h5>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" bsPrefix="p-0">
                      ...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(index)}>
                        <FaEdit className="me-2" />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(index)}>
                        <FaTrash className="me-2 text-danger" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <p className="card-text">
                  <strong>City:</strong> {center.city} <br />
                  <strong>Pincode:</strong> {center.pincode} <br />
                  <strong>Landmark:</strong> {center.landmark} <br />
                  <strong>Address:</strong> {center.address}
                  <strong>CenterHead:</strong> {center.centerhead}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addcenter;
