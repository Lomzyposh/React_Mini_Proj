import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { AppContext } from "../context/AppContext";

function SignUpPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loaderShow, setLoaderShow] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const {
    setIsLoggedIn,
  } = useContext(AppContext);

  const showAlert = (type, msg) => {
    setAlert({ type, message: msg });

    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 3000);
  };


  const createUser = (e) => {
    e.preventDefault();
    setLoaderShow(true);

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some(user => user.email === email)) {
      setLoaderShow(false);
      showAlert("error", "User already exists!");
      return;
    }

    if (!email || !password || !confirmPassword) {
      setLoaderShow(false);
      showAlert("warning", "Please fill in all fields!");
      return;
    }



    if (password !== confirmPassword) {
      setLoaderShow(false);
      setAlert({ type: "error", message: "Passwords do not match!" });
      return;
    }


    const newUser = {
      'email': email,
      'password': password,
      'role': "user",
    }

    setTimeout(() => {
      setLoaderShow(false);
      existingUsers.push(newUser);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      showAlert("success", "User created successfully!");

      setEmail('')
      setPassword('');
      setConfirmPassword('');
      navigate('/dashboard');
    }, 1000)

  }

  return (
    <>
      <AlertMessage type={alert.type} msg={alert.message} />
      <Loader loaderShow={loaderShow} />
      <div className="login-container">
        <form className="login-box">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={createUser}>Sign Up</button>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUpPage;
