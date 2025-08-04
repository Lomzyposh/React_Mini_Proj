import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import { AppContext } from '../context/AppContext';

function Login() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loaderShow, setLoaderShow] = useState(false);

  const {
    setIsLoggedIn,
  } = useContext(AppContext);


  const showAlert = (type, msg) => {
    setAlert({ type, message: msg });

    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 3000);
  };


  const handleLogin = (e) => {
    e.preventDefault();
    setLoaderShow(true);
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (!email || !password) {
      setLoaderShow(false);
      showAlert("warning", "Please fill in all fields!");
      return;
    }

    const user = existingUsers.find(user => user.email === email && user.password === password);

    const checkEmail = existingUsers.find(user => user.email === email);

    setTimeout(() => {
      setLoaderShow(false);
      if (!checkEmail) {
        showAlert("error", "User doesn't exist")
      }

      if (!user) {
        showAlert("error", "Invalid email or password!");
        return;
      }

      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      navigate('/dashboard');
    }, 1500)
  }

  return (
    <>
      <AlertMessage type={alert.type} msg={alert.message} />
      <Loader loaderShow={loaderShow} />
      <div className="login-container">
        <form className="login-box">
          <h2>Login</h2>
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
          <button type="submit" onClick={handleLogin}>Login</button>
          <p>
            Don’t have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;