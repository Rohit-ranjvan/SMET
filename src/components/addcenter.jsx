import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCity, FaMapMarkerAlt, FaMapPin, FaAddressCard } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Addcenter = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    landmark: "",
    address: "",
  });

  const [centers, setCenters] = useState([]); // Stores the centers
  const [showForm, setShowForm] = useState(false); // Toggles the form visibility
  const [editMode, setEditMode] = useState(false); // Tracks if we are editing
  const [editIndex, setEditIndex] = useState(null); // Index of the center being edited

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Edit existing center
      const updatedCenters = centers.map((center, index) =>
        index === editIndex ? formData : center
      );
      setCenters(updatedCenters);
    } else {
      // Add new center
      setCenters([...centers, formData]);
    }

    // Reset form and close it
    setFormData({ name: "", city: "", pincode: "", landmark: "", address: "" });
    setShowForm(false);
    setEditMode(false);
    setEditIndex(null);
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
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-success w-100">
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
