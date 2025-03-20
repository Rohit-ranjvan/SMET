import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDonate, FaUsers, FaRupeeSign, FaCalendarAlt, FaQrcode } from "react-icons/fa";

const PaymentTable = () => {
  // State for managing donations and donors
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationPurpose, setDonationPurpose] = useState("");
  const [totalFunds, setTotalFunds] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Function to handle donation submission
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!donorName || !donationAmount || !donationPurpose || !paymentMethod) {
      alert("Please fill all fields and select a payment method!");
      return;
    }

    const newDonation = {
      id: donations.length + 1,
      donorName,
      donationAmount: parseFloat(donationAmount),
      donationPurpose,
      paymentMethod,
      date: new Date().toLocaleDateString(),
    };

    // Update donations list and total funds
    setDonations([...donations, newDonation]);
    setTotalFunds(totalFunds + newDonation.donationAmount);

    // Clear form fields
    setDonorName("");
    setDonationAmount("");
    setDonationPurpose("");
    setPaymentMethod("");
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-gradient">
          {/* <FaDonate className="me-2" /> */}
          Trust Donation Management
        </h1>
        {/* <p className="lead text-muted">Transparent and Efficient Donation System</p> */}
      </div>

      {/* Donation Form */}
      <div className="card shadow-lg mb-4 border-0 animate__animated animate__fadeIn">
        <div className="card-header bg-gradient-primary text-white">
          <h5 className="mb-0">
            {/* <FaDonate className="me-2" /> */}
            Accept Donations
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleDonationSubmit}>
            <div className="mb-3">
              <label htmlFor="donorName" className="form-label">
                Donor Name
              </label>
              <input
                type="text"
                className="form-control"
                id="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="donationAmount" className="form-label">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                className="form-control"
                id="donationAmount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="donationPurpose" className="form-label">
                Donation Purpose
              </label>
              <select
                className="form-select"
                id="donationPurpose"
                value={donationPurpose}
                onChange={(e) => setDonationPurpose(e.target.value)}
                required
              >
                <option value="">Select Purpose</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">
                Payment Method
              </label>
              <select
                className="form-select"
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="GPay">GPay</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit Donation
            </button>
          </form>
        </div>
      </div>

      {/* Donation Summary */}
      <div className="card shadow-lg mb-4 border-0 animate__animated animate__fadeIn">
        <div className="card-header bg-gradient-success text-white">
          <h5 className="mb-0">
            <FaRupeeSign className="me-2" />
            Donation Summary
          </h5>
        </div>
        <div className="card-body">
          <h4 className="text-center">
            Total Funds Collected: <span className="text-success">₹{totalFunds.toFixed(2)}</span>
          </h4>
        </div>
      </div>

      {/* Donation List */}
      <div className="card shadow-lg border-0 animate__animated animate__fadeIn">
        <div className="card-header bg-gradient-info text-white">
          <h5 className="mb-0">
            <FaUsers className="me-2" />
            Donation Records
          </h5>
        </div>
        <div className="card-body">
          {donations.length === 0 ? (
            <p className="text-muted text-center">No donations recorded yet.</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Donor Name</th>
                  <th>Amount (₹)</th>
                  <th>Purpose</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.id}</td>
                    <td>{donation.donorName}</td>
                    <td className="text-success fw-bold">{donation.donationAmount.toFixed(2)}</td>
                    <td>{donation.donationPurpose}</td>
                    <td>{donation.paymentMethod}</td>
                    <td>
                      <FaCalendarAlt className="me-2" />
                      {donation.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Payment Options */}
      <div className="card shadow-lg border-0 animate__animated animate__fadeIn mt-4">
        <div className="card-header bg-gradient-warning text-white">
          <h5 className="mb-0">
            <FaQrcode className="me-2" />
            Payment Options
          </h5>
        </div>
        <div className="card-body text-center">
          <h6 className="mb-3">Scan the QR Code to Donate</h6>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
            alt="QR Code"
            className="img-fluid mb-3"
          />
          <p className="text-muted">Supported Payment Apps: GPay, PhonePe, Paytm, UPI</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;