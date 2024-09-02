// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(''); // New state for mobile number
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', { fname, lname, email, dob, password, mobile });
    navigate('/'); // Redirect after successful registration
  };

  return (
    <div className="register-container">
      <h1>URUSHYA</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setfName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setlName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)} // New mobile input field
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate('/')} className="link-text">
        Already have an account? Login here.
      </p>
    </div>
  );
};

export default Register;
