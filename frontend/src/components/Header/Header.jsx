import React from 'react';
import './Header.css';

const Header = ({ scrollToProducts }) => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Build Your Dreams, One Tool at a Time</h2>
        <p>Explore our wide range of quality tools and hardware to make your projects a success. Whether you're a DIY enthusiast or a professional builder, find everything you need at Kandurata Hardware. Start building today!</p>
        <button onClick={scrollToProducts}>View Shop</button> {/* Button to scroll */}
      </div>
    </div>
  );
};

export default Header;