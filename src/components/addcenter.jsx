import React, { useState, useEffect } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCity, FaMapMarkerAlt, FaMapPin, FaAddressCard, FaUser } from "react-icons/fa";
import axios from "axios";


const Addcenter = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pinCode: 0,
    landmark: "",
    address: "",
    centerHead: "",
  });

  const [centers, setCenters] = useState([]);
  const [tlList, setTlList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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

    axios
      .get(`${import.meta.env.VITE_SOME_KEY}/API/V1/GET_TL`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTlList(response.data);
        } else {
          console.error('Failed to fetch TL data');
        }
      })
      .catch((error) => {
        console.error('Error fetching TL data:', error);
        alert('Error fetching TL data. Please try again.');
      });
  }, [userToken]);

  const fetchCenterById = (id) => {

    console.log("Fetching center with ID:", id);
    axios
      .get(`${import.meta.env.VITE_SOME_KEY}/API/V1/GET_CENTER/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.centerHead == null) {
            setFormData({
              ...formData,
              id: response.data.id,
              name: response.data.name,
              city: response.data.city,
              pinCode: response.data.pinCode,
              landmark: response.data.landmark,
              address: response.data.address,
              centerHead: null,
            })
          }
          else {
            setFormData({
              ...formData,
              id: response.data.id,
              name: response.data.name,
              city: response.data.city,
              pinCode: response.data.pinCode,
              landmark: response.data.landmark,
              address: response.data.address,
              centerHead: response.data.centerHead.aygcode,
            })
          }
          console.log("formdata", response.data);
          setShowModal(true);
          setEditMode(true);
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

  const handleEdit = (index) => {
    const center = centers[index];
    if (center) {
      setEditIndex(index);
      fetchCenterById(center.id);
      setEditMode(true);
      setShowModal(true);
    } else {
      console.error("No center found at index:", index);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData ID", formData.id);
    if (editMode) {
      axios
        .put(
          `${import.meta.env.VITE_SOME_KEY}/API/V1/UPDATE_CENTER/${formData.id}`,
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
            console.log("formdata Updated :- ", response)
            if (response.data.centerHead == null) {
              setFormData({
                ...formData,
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                pinCode: response.data.pinCode,
                landmark: response.data.landmark,
                address: response.data.address,
                centerHead: null,
              })
            }
            else {
              setFormData({
                ...formData,
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                pinCode: response.data.pinCode,
                landmark: response.data.landmark,
                address: response.data.address,
                centerHead: response.data.centerHead.aygcode,
              })
            }
            const updatedCenters = [...centers];
            updatedCenters[editIndex] = formData;
            setCenters(updatedCenters);
            setFormData({
              name: "",
              city: "",
              pinCode: 0,
              landmark: "",
              address: "",
              centerHead: "",
            });
            setShowModal(false);
            setEditMode(false);
          } else {
            alert('Failed to update center');
          }
        })
        .catch((error) => {
          console.error("Error updating center:", error);
          alert('Error updating center. Please try again.');
        });
    } else {
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
            setCenters([...centers, formData]);
            setFormData({
              name: "",
              city: "",
              pinCode: 0,
              landmark: "",
              address: "",
              centerHead: "",
            });
            setShowModal(false);
          } else {
            alert('Failed to save center');
          }
        })
        .catch((error) => {
          console.error("Error saving center:", error);
          alert('Error saving center. Please try again.');
        });
    }
  };

  return (
    <div className="container mt-1">
      <button
        className={`btn ${showModal ? "btn-danger" : "btn-primary"} mb-4`}
        onClick={() => {
          setShowModal(true);
          setEditMode(false);
          setFormData({
            name: "",
            city: "",
            pinCode: 0,
            landmark: "",
            address: "",
            centerHead: "",
          });
        }}
      >
        {showModal ? <FaTimes className="me-2" /> : <FaPlus className="me-2" />}
        {showModal ? "Close Form" : "Add Center"}
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Center" : "Add New Center"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <FaCity className="me-2 text-secondary fs-6" />
                Center Name
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

            <div className="mb-3">
              <label className="form-label">
                <FaMapPin className="me-2 text-secondary fs-6" />
                pincode
              </label>
              <input
                type="number"
                className="form-control"
                name="pinCode"
                value={formData.pinCode}
                onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2 text-secondary fs-6" />
                Center Head
              </label>
              <select
                className="form-control"
                name="centerHead"
                value={formData.centerHead}
                onChange={(e) => setFormData({ ...formData, centerHead: e.target.value })}
                required
              >
                <option value={formData.centerHead}>{formData.centerHead}</option>
                {tlList.map((tl, index) => (
                  <option key={tl.id} value={tl.aygcode}>
                    {tl.aygcode}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              {editMode ? "Update" : "Add Center"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

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
