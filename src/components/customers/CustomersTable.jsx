import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTasks, FaUser, FaBell, FaCheckCircle, FaSpinner } from "react-icons/fa";

const CustomersTable = () => {
  // State for managing tasks and volunteers
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedVolunteer, setAssignedVolunteer] = useState("");
  const [volunteers] = useState([
    { id: 1, name: "Rohit Ranjvan" },
    { id: 2, name: "Shubham Jaiswal" },
    { id: 3, name: "Aditya Sahani" },
    { id: 4, name: "Rajesh Pawar" },
    { id: 5, name: "Sarthak Khandekr" },
    { id: 6, name: "Aditya Katkar" },
    { id: 7, name: "Haresh Shingare" },
    { id: 8, name: "Yogesh Mahapade" },
  ]);

  // Function to handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription || !assignedVolunteer) {
      alert("Please fill all fields and select a volunteer!");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDescription,
      assignedVolunteer,
      status: "Pending",
    };

    // Update tasks list
    setTasks([...tasks, newTask]);

    // Send notification to the assigned volunteer
    alert(`Notification sent to ${assignedVolunteer}: New task assigned - "${taskTitle}"`);

    // Clear form fields
    setTaskTitle("");
    setTaskDescription("");
    setAssignedVolunteer("");
  };

  // Function to update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-gradient">
          <FaTasks className="me-2" />
          Task Management System
        </h1>
        <p className="lead text-muted">Assign tasks to volunteers and track progress</p>
      </div>

      {/* Task Creation Form */}
      <div className="card shadow-lg mb-4 border-0 animate__animated animate__fadeIn">
        <div className="card-header bg-gradient-primary text-white">
          <h5 className="mb-0">
            <FaTasks className="me-2" />
            Create New Task
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleTaskSubmit}>
            <div className="mb-3">
              <label htmlFor="taskTitle" className="form-label">
                Task Title
              </label>
              <input
                type="text"
                className="form-control"
                id="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">
                Task Description
              </label>
              <textarea
                className="form-control"
                id="taskDescription"
                rows="3"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="assignedVolunteer" className="form-label">
                Assign to Volunteer
              </label>
              <select
                className="form-select"
                id="assignedVolunteer"
                value={assignedVolunteer}
                onChange={(e) => setAssignedVolunteer(e.target.value)}
                required
              >
                <option value="">Select Volunteer</option>
                {volunteers.map((volunteer) => (
                  <option key={volunteer.id} value={volunteer.name}>
                    {volunteer.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Create Task
            </button>
          </form>
        </div>
      </div>

      {/* Task Records */}
      <div className="card shadow-lg border-0 animate__animated animate__fadeIn">
        <div className="card-header bg-gradient-info text-white">
          <h5 className="mb-0">
            <FaTasks className="me-2" />
            Task Records
          </h5>
        </div>
        <div className="card-body">
          {tasks.length === 0 ? (
            <p className="text-muted text-center">No tasks created yet.</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Assigned Volunteer</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.assignedVolunteer}</td>
                    <td>
                      {task.status === "Pending" && (
                        <span className="badge bg-warning">
                          <FaSpinner className="me-1" />
                          Pending
                        </span>
                      )}
                      {task.status === "In Progress" && (
                        <span className="badge bg-primary">
                          <FaSpinner className="me-1" />
                          In Progress
                        </span>
                      )}
                      {task.status === "Completed" && (
                        <span className="badge bg-success">
                          <FaCheckCircle className="me-1" />
                          Completed
                        </span>
                      )}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;