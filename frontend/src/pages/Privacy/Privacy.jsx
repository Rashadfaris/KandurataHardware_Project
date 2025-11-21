import React from 'react';
import './Privacy.css';

import Footer from '../../components/Footer/Footer';

const Privacy = () => {
    return (
        <div className="privacy-page">
         
            <div className="privacy-container">
                <h1>Privacy Policy</h1>
                <div className="privacy-content">
                    <section className="privacy-section">
                        <h2>Introduction</h2>
                        <p>
                            At Kandurata Hardware, we are committed to protecting your privacy and ensuring the security of your 
                            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                            information when you visit our website and use our services.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Information We Collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                            <li>Name and contact information (email address, phone number, mailing address)</li>
                            <li>Account credentials (username and password)</li>
                            <li>Payment information (processed securely through our payment providers)</li>
                            <li>Order history and preferences</li>
                            <li>Communications with us (customer service inquiries, feedback)</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Process and fulfill your orders</li>
                            <li>Communicate with you about your orders and our services</li>
                            <li>Improve our website and customer experience</li>
                            <li>Send you promotional materials (with your consent)</li>
                            <li>Detect and prevent fraud or abuse</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>Information Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share your information 
                            only in the following circumstances:
                        </p>
                        <ul>
                            <li>With service providers who assist us in operating our website and conducting our business</li>
                            <li>When required by law or to protect our rights</li>
                            <li>In connection with a business transfer (merger, acquisition, etc.)</li>
                            <li>With your explicit consent</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your personal information 
                            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                            the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access and review your personal information</li>
                            <li>Request corrections to inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Withdraw consent where processing is based on consent</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>Cookies</h2>
                        <p>
                            Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your 
                            browser settings. However, disabling cookies may affect the functionality of our website.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                            Privacy Policy on this page and updating the "Last Updated" date.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <p className="contact-info">
                            <strong>Email:</strong> rashadfaris4675@gmail.com<br />
                            <strong>Phone:</strong> 077 9207875
                        </p>
                    </section>

                    <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Privacy;

