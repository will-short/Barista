import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import logo from "../../images/Barista-logo-text.png";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile_image, setProfile_image] = useState(
    "https://res.cloudinary.com/dc9htgupc/image/upload/c_fill,h_200,w_200/v1636321298/y7ig5h9stnxi2zcjrix4.png"
  );
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          name,
          email,
          username,
          password,
          profile_image,
          location,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ubllb9oo");
    data.append("cloud_name", "dc9htgupc");
    fetch("https://api.cloudinary.com/v1_1/dc9htgupc/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        let split = data.url.split("upload");
        setProfile_image(`${split[0]}upload/c_fill,h_200,w_200${split[1]}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <img className="logo" src={logo} alt="" />
      <div className="img-container">
        <img src={profile_image} />
        <input
          type="file"
          onChange={(e) => uploadImage(e.target.files[0])}
          id="img"
          style={{ display: "none" }}
        ></input>
        <label htmlFor="img">Upload Profile Pic</label>
      </div>
      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>{errors.name}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{errors.email}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>{errors.username}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
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
      <div>
        <input
          type="password"
          placeholder="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p>{errors.confirmPassword}</p>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
