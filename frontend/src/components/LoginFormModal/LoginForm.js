import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import logo from "../../images/Barista-logo-text.png";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
      <form onSubmit={handleSubmit} className="login">
        <div>
          <input
            type="text"
            value={credential}
            placeholder="username or email"
            onChange={(e) => setCredential(e.target.value)}
          />
          <p>{errors.credential}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{errors.password}</p>
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginForm;
