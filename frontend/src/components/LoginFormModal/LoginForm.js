import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/Barista-logo-text.png";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <img className="logo" src={logo} alt="" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={credential}
            placeholder="username or email"
            onChange={(e) => setCredential(e.target.value)}
          />
          {errors.includes("Please provide a valid email or username.") && (
            <p>Please provide a valid email or username.</p>
          )}
          {errors.includes("The provided credentials were invalid.") && (
            <p>The provided credentials were invalid. Please try again</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.includes("Please provide a password.") && (
            <p>Please provide a password.</p>
          )}
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginForm;
