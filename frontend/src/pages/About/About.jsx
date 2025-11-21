import React from 'react';
import './About.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const About = () => {
    return (
        <div className="about-page">
            <Navbar />
            <div className="about-container">
                <h1>About Us</h1>
                <div className="about-content">
                    <section className="about-section">
                        <h2>Welcome to Kandurata Hardware</h2>
                        <p>
                            Established in 2012, Kandurata Hardware has been your trusted destination for quality building materials, 
                            tools, and gardening supplies. We take pride in offering a comprehensive range of products tailored to 
                            meet the needs of both DIY enthusiasts and professional contractors.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to provide exceptional service, competitive prices, and expert advice to help you complete 
                            your projects successfully. We believe in building lasting relationships with our customers through 
                            reliability, quality, and outstanding customer service.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>What We Offer</h2>
                        <ul>
                            <li>Wide range of building materials and hardware</li>
                            <li>Professional-grade tools and equipment</li>
                            <li>Quality gardening supplies and accessories</li>
                            <li>Expert advice from our knowledgeable staff</li>
                            <li>Competitive pricing on all products</li>
                            <li>Convenient online shopping experience</li>
                        </ul>
                    </section>

                    <section className="about-section">
                        <h2>Why Choose Us</h2>
                        <p>
                            At Kandurata Hardware, we understand that quality matters. That's why we carefully select our products 
                            to ensure they meet the highest standards. Whether you're working on a small home improvement project 
                            or a large construction job, we have everything you need under one roof.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;

