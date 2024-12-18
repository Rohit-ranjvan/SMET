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
  console.log("Token getItem", userToken);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOME_KEY}/API/V1/GET_CENTERS`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include token in headers
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCenters(response.data); // Set centers with the response data
        } else {
          console.error('Failed to fetch centers');
        }
      })
      .catch((error) => {
        console.error('Error fetching centers:', error);
        alert('Error fetching centers. Please try again.');
      });
  }, [userToken]); // Dependency on userToken

  // Fetch a single center's data for editing
  const fetchCenterById = (id) => {
    console.log("Fetching center with ID:", id);
    axios
      .get(`${import.meta.env.VITE_SOME_KEY}/API/V1/GET_CENTER/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include token in headers
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
        if (error.response) {
          console.log('Error Response:', error.response.data);
          alert(error.response.data.message || 'Unauthorized');
        }
      });
      
      console.log('Authorization token:', `Bearer ${userToken}`);
  };
  

  // Handle editing a center
  const handleEdit = (index) => {
    const center = centers[index];
    setEditIndex(index); // Store the index for reference
    fetchCenterById(center.id); // Fetch the center data by ID
  };

  // Handle form submission (Add or Edit center)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    axios
      .post(
        `${import.meta.env.VITE_SOME_KEY}/API/V1/ADD_CENTER`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include token in the headers
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Successfully added or edited center
          console.log('Center saved successfully', response.data);
          if (editMode) {
            // Update the edited center in the local state
            const updatedCenters = [...centers];
            updatedCenters[editIndex] = formData; // Update the edited center
            setCenters(updatedCenters);
          } else {
            // Add the new center
            setCenters([...centers, formData]); // Add new center to local state
          }
          setFormData({ name: "", city: "", pincode: 0, landmark: "", address: "", centerHead: "" }); // Clear the form
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
          setShowModal(true); // Show the modal
          setEditMode(false); // Ensure we are in "Add" mode, not edit
          setFormData({ name: "", city: "", pincode: 0, landmark: "", address: "", centerHead: "" }); // Reset form
        }}
      >
        {showModal ? <FaTimes className="me-2" /> : <FaPlus className="me-2" />} {showModal ? "Close Form" : "Add Center"}
      </button>

      {/* Modal for form */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Center" : "Add New Center"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
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
            {/* Additional fields here */}
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
                  <strong>CenterHead:</strong> {center.centerHead?.firstName || 'Unknown'} {center.centerHead?.lastName || 'Unknown'} <br />
                  <strong>CenterHead Email:</strong> {center.centerHead?.email || ''} <br />
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
