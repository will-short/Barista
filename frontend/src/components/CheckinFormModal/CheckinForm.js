import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postCheckin } from "../../store/checkins";
import "./CheckinForm.css";

export default function CheckinForm({ drinkId, ownerId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(
    "https://www.nasa.gov/sites/default/files/thumbnails/image/2008_m87_labeled.jpg"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      postCheckin({ rating, description, drinkId, image, ownerId })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
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
        setImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Create Checkin</h1>
      <form onSubmit={handleSubmit}>
        <div className="img-container">
          <img src={image} className="checkinImage" />
          <input
            type="file"
            onChange={(e) => uploadImage(e.target.files[0])}
            id="img"
            style={{ display: "none" }}
          ></input>
          <label htmlFor="img">Upload Profile Pic</label>
        </div>
        <div className="inputs">
          <div>
            <input
              type="number"
              value={rating ? rating : "enter rating"}
              placeholder="enter rating"
              onChange={(e) => setRating(e.target.value)}
            />
            <p>{errors.credential}</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="caption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p>{errors.password}</p>
          </div>
        </div>
        <button type="submit">Create Checkin</button>
      </form>
    </>
  );
}
