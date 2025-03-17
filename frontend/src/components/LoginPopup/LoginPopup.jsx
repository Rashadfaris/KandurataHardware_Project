import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => { 
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrentState] = useState("Login");
    const [data, setData] = useState({ name: "", email: "", password: "" });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    const onLogin = async (event) => {
        event.preventDefault();
        if (!data.email || !data.password || (currState === "Sign Up" && !data.name)) {
            alert("Please fill in all fields");
            return;
        }
    
        let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
        try {
            const response = await axios.post(`${url}${endpoint}`, data);
    
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                
                // Only store name if it's in the response and we're logging in
                if (currState === "Sign Up") {
                    localStorage.setItem("name", data.name); // Sign-up name
                } else if (response.data.user) {
                    localStorage.setItem("name", response.data.user.name); // Login name
                }
    
                localStorage.setItem("email", data.email); // Store email
                setShowLogin(false); // Close the popup
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-input">
                    {currState === "Sign Up" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>

                {currState === "Sign Up" && (
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use and privacy policy</p>
                    </div>
                )}

                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;