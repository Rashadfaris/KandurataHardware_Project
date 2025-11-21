import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png"; // adjust path if needed
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + Description */}
        <div className="ifooter-section description">
          <img src={logo} alt="Logo" className="footer-logo" />

          <p>
            Your trusted destination for quality building materials, tools, and
            gardening supplies. We offer a wide range of products for both DIY
            enthusiasts and professionals.
          </p>

          <div className="social-media-icons">
            <FaFacebook className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaLinkedin className="social-icon" />
          </div>
        </div>

        {/* Company Section */}
        <div className="ifooter-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="ifooter-section contact">
          <h3>Get in Touch</h3>
          <p>1234 Street Name, City, Country</p>
          <p>Email: rashadfaris4675@gmail.com</p>
          <p>Phone: 077 9207875</p>
        </div>

      </div>

      <div className="ifooter-bottom">
        <p>© 2025 Kandurata Hardware. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
