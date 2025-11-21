import React from 'react';
import './Contact.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Contact = () => {
    return (
        <div className="contact-page">
            <Navbar />
            <div className="contact-container">
                <h1>Contact Us</h1>
                <div className="contact-content">
                    <div className="contact-info-section">
                        <h2>Get in Touch</h2>
                        <p>
                            We'd love to hear from you! Whether you have a question about our products, need assistance with an order, 
                            or want to provide feedback, we're here to help.
                        </p>
                        
                        <div className="contact-details">
                            <div className="contact-item">
                                <h3>Email</h3>
                                <p>
                                    <a href="mailto:rashadfaris4675@gmail.com">rashadfaris4675@gmail.com</a>
                                </p>
                            </div>
                            
                            <div className="contact-item">
                                <h3>Phone</h3>
                                <p>
                                    <a href="tel:+94779207875">077 9207875</a>
                                </p>
                            </div>
                            
                            <div className="contact-item">
                                <h3>Business Hours</h3>
                                <p>
                                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                                    Saturday: 9:00 AM - 5:00 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Send Us a Message</h2>
                        <p>
                            Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                        <div className="form-note">
                            <p>
                                <strong>Note:</strong> For product inquiries and support, you can also use our 
                                <a href="/contact-us"> Contact Us Form</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;

