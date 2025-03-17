import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./contactUsForm.css";
import { Card } from "@mui/material"; // Optional import if you're using Card component
import { createNotify } from "./ToastMessages"; // Custom notification function
import { Bounce, ToastContainer } from "react-toastify"; // Toast notifications
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Success icon
import ListAltIcon from '@mui/icons-material/ListAlt'; // Inquiry list icon

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    username: "", // Initialize without stored name
    email: "", // Initialize without stored email
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Prefill form with values from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('name') || ''; // Retrieve name from localStorage
    const storedEmail = localStorage.getItem('email') || ''; // Retrieve email from localStorage
    setFormData({
      username: storedName, // Set stored name
      email: storedEmail, // Set stored email
      message: "",
    });
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axios.post(
        "http://localhost:5001/inquiries",
        formData
      );
      createNotify("Inquiry submitted successfully!"); // Show success notification
      setStatusMessage("Inquiry submitted successfully!");
      setIsSubmitted(true); // Set submitted state
      setFormData({ username: "", email: "", message: "" }); // Clear form message
      setErrors({}); // Clear errors
      // Optionally navigate to another page
      // navigate('/queries');
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatusMessage("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center" style={{ margin: "0 auto" }}>
      {isSubmitted ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CheckCircleIcon style={{ color: "#36b936", fontSize: "60px" }} />
          <p className="mt-5" style={{ fontSize: "50px", color: "black" }}>
            Thanks for contacting us!
          </p>
          <button
            className="btn btn-warning fw-bold mt-5"
            style={{ width: "100%" }}
            onClick={() => { navigate("/queries") }} // Navigate to inquiries
          >
            <ListAltIcon />{" "}View my inquiries
          </button>
        </div>
      ) : (
        <div
          className="card shadow-sm d-flex flex-column align-items-center justify-content-center w-50 p-5 mt-5"
          style={{ backgroundColor: "" }}
        >
          <p className="" style={{ fontWeight: 600, fontSize: "40px", color: "black" }}>
            Contact us
          </p>
          {statusMessage && (
            <p style={{ color: statusMessage.includes("Failed") ? "red" : "green" }}>
              {statusMessage}
            </p>
          )}
          <form className="w-100" onSubmit={handleSubmit}>
            <div>
              <label className="form-label fw-bold" htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                style={{ width: "100%", boxSizing: "border-box" }}
              />
              {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
            </div>
            <div className="mt-4">
              <label className="form-label fw-bold" htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                disabled
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className="mt-4">
              <label className="form-label fw-bold" htmlFor="message" style={{ display: "block", marginBottom: "5px" }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              ></textarea>
              {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            </div>
            <button
              className="w-100 rounded-3 mt-4"
              type="submit"
              style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "black", color: "white" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default ContactUsForm;