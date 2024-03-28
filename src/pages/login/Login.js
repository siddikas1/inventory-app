

import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { publicRequest } from "../../api/axiosSetup";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import "./Login.css"; // Import CSS file for styling

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await publicRequest.post("/login", { email, password });

      localStorage.setItem(
        "accessToken",
        JSON.stringify(response?.data?.accessToken)
      );
      const roleList = [1, 2, 3];

      const mergedData = { ...response.data, role: roleList };
      console.log(mergedData);
      dispatch(loginSuccess(mergedData));
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="login-container">
      <h1 className="title">Inventory Management System</h1>
      <h3 className="sub-title">Sign in to your account</h3>
      {/* <h3>Sign in to your account</h3> */}
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;

