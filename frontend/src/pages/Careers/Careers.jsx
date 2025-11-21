import React from 'react';
import './Careers.css';

import Footer from '../../components/Footer/Footer';

const Careers = () => {
    return (
        <div className="careers-page">
            
            <div className="careers-container">
                <h1>Careers at Kandurata Hardware</h1>
                <div className="careers-content">
                    <section className="careers-section">
                        <h2>Join Our Team</h2>
                        <p>
                            At Kandurata Hardware, we're always looking for talented, motivated individuals to join our growing team. 
                            We offer a dynamic work environment where you can grow your career while contributing to our mission of 
                            providing exceptional service to our customers.
                        </p>
                    </section>

                    <section className="careers-section">
                        <h2>Why Work With Us?</h2>
                        <ul>
                            <li>Competitive salary and benefits package</li>
                            <li>Opportunities for professional growth and development</li>
                            <li>Supportive and collaborative work environment</li>
                            <li>Employee discounts on products</li>
                            <li>Work-life balance initiatives</li>
                            <li>Training and skill development programs</li>
                        </ul>
                    </section>

                    <section className="careers-section">
                        <h2>Current Openings</h2>
                        <p>
                            We are currently looking for passionate individuals to fill various positions. If you're interested in 
                            joining our team, please send your resume and cover letter to our contact email.
                        </p>
                        <div className="openings-list">
                            <div className="opening-item">
                                <h3>Sales Associate</h3>
                                <p>Full-time position with customer service focus</p>
                            </div>
                            <div className="opening-item">
                                <h3>Warehouse Staff</h3>
                                <p>Part-time and full-time positions available</p>
                            </div>
                            <div className="opening-item">
                                <h3>Delivery Driver</h3>
                                <p>Full-time position with competitive pay</p>
                            </div>
                        </div>
                    </section>

                    <section className="careers-section">
                        <h2>How to Apply</h2>
                        <p>
                            To apply for any position, please send your resume and a cover letter to:
                        </p>
                        <p className="contact-info">
                            <strong>Email:</strong> rashadfaris4675@gmail.com<br />
                            <strong>Phone:</strong> 077 9207875
                        </p>
                        <p>
                            We review all applications and will contact qualified candidates for interviews.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Careers;

