import React from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <form className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username or Email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;