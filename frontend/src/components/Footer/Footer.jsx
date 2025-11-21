import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo_footer.png'; // Adjust the path if necessary
import facebookIcon from '../../assets/facebook_icon.png';
import twitterIcon from '../../assets/twitter_icon.png';
import linkedinIcon from '../../assets/linkedin_icon.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="ifooter-section description">
                    <img src={logo} alt="Company Logo" className="footer-logo" />
                    <p>Your trusted destination for quality building materials, tools, and gardening supplies. Established in 2012, we offer a wide range of products tailored to meet the needs of both DIY enthusiasts and professionals. Experience exceptional service, competitive prices, and expert advice—all under one roof!</p>
                    
                    {/* Social Media Icons Section */}
                    <div className="social-media-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter" className="social-icon" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                        </a>
                    </div>
                </div>
                <div className="ifooter-section links">
                    <h3>Company</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className="ifooter-section contact">
                    <h3>GET IN TOUCH</h3>
                    <p>1234 Street Name, City, Country</p>
                    <p>Email: <a href="mailto:rashadfaris4675@gmail.com">rashadfaris4675@gmail.com</a></p>
                    <p>Phone: <a href="tel:+94779207875">077 9207875</a></p>
                </div>
            </div>
            <div className="ifooter-bottom">
                <p>&copy; {new Date().getFullYear()} Kandurata Hardware. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
