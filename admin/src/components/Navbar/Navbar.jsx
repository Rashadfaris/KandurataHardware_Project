import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css'

import { assets } from '../../assets/assets';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignOut = () => {
    // You can add any sign-out logic here (e.g., clearing auth tokens, session data)
    navigate('/'); // Navigate to the login page ("/" route)
  };

  return (
    <div>
        <div className="navbar">
            <img className='logo' src={assets.logo} alt="Logo" />
            <div className="navbar-right">
                <button className='sign-out-button' onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </div>
    </div>
  );
}

export default Navbar;
