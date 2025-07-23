import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="login-container">
      <form className="login-box">
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
