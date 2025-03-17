// src/components/Inquiry/EditInquiryForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditInquiryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({ username: "", email: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/inquiries/${id}`);
        setInquiry(response.data.inquiry);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
        toast.error("Failed to fetch inquiry.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/inquiries/${id}`, inquiry);
      toast.success("Inquiry updated successfully!");
      navigate("/queries"); // Redirect to the User Queries page
    } catch (error) {
      console.error("Error updating inquiry:", error);
      toast.error("Failed to update inquiry.");
    }
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status" />;
  }

  return (
    <div className="container mt-5">
      <h1>Edit Inquiry</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={inquiry.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={inquiry.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            name="message"
            value={inquiry.message}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary"
        style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "black", color: "white" }}
        >Edit Inquiry</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditInquiryForm;
