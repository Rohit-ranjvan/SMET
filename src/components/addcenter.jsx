import React, { useState, useEffect } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCity, FaMapMarkerAlt, FaMapPin, FaAddressCard, FaUser } from "react-icons/fa";
import axios from "axios";

const Addcenter = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: 0,
    landmark: "",
    address: "",
    centerHead: "",
  });

  const [centers, setCenters] = useState([]); // Stores the centers
  const [showModal, setShowModal] = useState(false); // Controls the modal visibility
  const [editMode, setEditMode] = useState(false); // Tracks if we are editing
  const [editIndex, setEditIndex] = useState(null); // Index of the center being edited
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOME_KEY}/API/V1/GET_CENTERS`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCenters(response.data);
        } else {
          console.error('Failed to fetch centers');
        }
      })
      .catch((error) => {
        console.error('Error fetching centers:', error);
        alert('Error fetching centers. Please try again.');
      });
  }, [userToken]);

  // Fetch a center's data by ID for editing
  const fetchCenterById = (id) => {
    axios
      .get(`${import.meta.env.VITE_SOME_KEY}/API/V1/GET_CENTER/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFormData(response.data); // Set the form data with the center data from the API
          setShowModal(true); // Open the modal
          setEditMode(true); // Set to edit mode
        } else {
          console.error('Failed to fetch center');
          alert('Failed to fetch center. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching center:', error);
        alert('Error fetching center. Please try again.');
      });
  };

  // Handle editing a center
  const handleEdit = (index) => {
    const center = centers[index];
    setEditIndex(index); // Store the index for reference
    fetchCenterById(center.id); // Fetch the center data by ID
    setEditMode(true); // Enable edit mode
    setShowModal(true); // Show the modal

  };

  // Handle form submission (Add or Edit center)
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_SOME_KEY}/API/V1/ADD_CENTER`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (editMode) {
            const updatedCenters = [...centers];
            updatedCenters[editIndex] = formData; // Update the edited center
            setCenters(updatedCenters);
          } else {
            setCenters([...centers, formData]); // Add new center
          }
          setFormData({
            name: "",
            city: "",
            pincode: 0,
            landmark: "",
            address: "",
            centerHead: "",
          });
          setShowModal(false); // Close modal
          setEditMode(false); // Reset to "Add" mode
        } else {
          alert('Failed to save center');
        }
      })
      .catch((error) => {
        console.error("Error saving center:", error);
        alert('Error saving center. Please try again.');
      });
  };

  return (
    <div className="container mt-1">
      <button
        className={`btn ${showModal ? "btn-danger" : "btn-primary"} mb-4`}
        onClick={() => {
          setShowModal(true);
          setEditMode(false); // Ensure we are in "Add" mode
          setFormData({
            name: "",
            city: "",
            pincode: 0,
            landmark: "",
            address: "",
            centerHead: "",
          });
        }}
      >
        {showModal ? <FaTimes className="me-2" /> : <FaPlus className="me-2" />}
        {showModal ? "Close Form" : "Add Center"}
      </button>

      {/* Modal for form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Center" : "Add New Center"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Name field */}
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* City field */}
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
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>

            {/* Pincode field */}
            <div className="mb-3">
              <label className="form-label">
                <FaMapPin className="me-2 text-secondary fs-6" />
                Pincode
              </label>
              <input
                type="number"
                className="form-control"
                name="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                required
              />
            </div>

            {/* Landmark field */}
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
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              />
            </div>

            {/* Address field */}
            <div className="mb-3">
              <label className="form-label">
                <FaAddressCard className="me-2 text-secondary fs-6" />
                Address
              </label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            {/* Center Head field */}
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2 text-secondary fs-6" />
                Center Head
              </label>
              <input
                type="text"
                className="form-control"
                name="centerHead"
                value={formData.centerHead}
                onChange={(e) => setFormData({ ...formData, centerHead: e.target.value })}
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-success w-100">
              {editMode ? "Save Changes" : "Add Center"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Centers List */}
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
                  <strong>Pincode:</strong> {center.pinCode} <br />
                  <strong>Landmark:</strong> {center.landmark} <br />
                  <strong>Address:</strong> {center.address} <br />
                  <strong>CenterHead:</strong> {center.centerHead?.aygcode || 'Unknown'} <br />
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
