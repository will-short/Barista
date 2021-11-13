import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postCheckin } from "../../store/checkins";
import "./CheckinForm.css";

export default function CheckinForm({ drinkId, ownerId, drinkImg }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(postCheckin({ rating, description, drinkId, image, ownerId }));
    setDescription("");
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
        <div id="textareaWrapper">
          <textarea
            placeholder="caption"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
          <span
            className={
              description.length <= 0 || description.length > 40 ? "dis" : ""
            }
          >
            {description.length}/40
          </span>
        </div>
        <div className="img-container">
          <input
            type="file"
            onChange={(e) => uploadImage(e.target.files[0])}
            id="img"
            style={{ display: "none" }}
          ></input>
          <label htmlFor="img">
            {image ? (
              <img src={image} alt="" />
            ) : (
              <span class="material-icons-outlined">add_a_photo</span>
            )}
          </label>
        </div>
        <div></div>
        <div className="inputs">
          <div>
            <label htmlFor="rating">{rating} Stars</label>
            <input
              type="range"
              min="0"
              max="10"
              id="rating"
              placeholder="enter rating"
              onChange={(e) => setRating(+e.target.value / 2)}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={description.length <= 0 || description.length > 40}
          id="checkinButton"
        >
          Create Checkin
        </button>
      </form>
    </>
  );
}
