import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="form-container">
      
      <div className = "h2">
        <h2>Play2Earn</h2>
    </div>

    <div className = "h4">
        <h4>Log In</h4>
     </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        <div className="signup-link">
          <h3>Don't have an account? <Link to="/signup" className="underline">Sign Up</Link></h3>
        </div>
        <div className="forgotpassword-link">
            <h3><Link to="/forgotpassword" className="underline">Forgot Password?</Link></h3>
        </div>

      </form>
    </div>
  );
};

export default Login;
