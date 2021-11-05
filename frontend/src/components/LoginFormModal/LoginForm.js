import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={credential}
          placeholder="username"
          onChange={(e) => setCredential(e.target.value)}
        />
        {errors.includes("Please provide a valid email or username.") && (
          <p>Please provide a valid email or username.</p>
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
  );
}

export default LoginForm;
