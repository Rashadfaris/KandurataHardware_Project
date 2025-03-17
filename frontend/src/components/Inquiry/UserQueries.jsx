import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './UserQueries.css'; 

const UserQueries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:5001/inquiries");
        setInquiries(response.data.inquiries);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        toast.error("Failed to fetch inquiries.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/replies");
        setReplies(response.data.replies || []);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    fetchInquiries();
    fetchReplies();
  }, []);

  // Find reply for a given inquiry ID
  const findReplyForInquiry = (inquiryId) => {
    return replies.find((reply) => reply.inquiryId === inquiryId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`http://localhost:5001/inquiries/${id}`);
        toast.success("Inquiry deleted successfully!");
        setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        toast.error("Failed to delete inquiry.");
      }
    }
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status" />;
  }

  // Filter inquiries based on the search query
  const filteredInquiries = inquiries.filter((inquiry) => {
    const reply = findReplyForInquiry(inquiry._id);
    const replyMessage = reply ? reply.replyMessage : "No reply";

    return (
      inquiry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      replyMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mt-5">
      <h1>User Inquiries</h1>

      {/* Search Box */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by username, email, message, or replies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col" >Username</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Replies</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInquiries.map((inquiry) => {
            const reply = findReplyForInquiry(inquiry._id); // Get the reply for each inquiry
            return (
              <tr key={inquiry._id}>
                <td>{inquiry.username}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.message}</td>
                <td>{reply ? reply.replyMessage : "No reply"}</td>
                <td>
                  {!reply && (
                    <Link
                      to={`/edit-inquiry/${inquiry._id}`}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </Link>
                  )}
                  {!reply && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(inquiry._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default UserQueries;
