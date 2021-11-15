import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postCheckin } from "../../store/checkins";
import "./CheckinForm.css";

export default function CheckinForm(data) {
  let { drinkId, close, closeDrink, location } = data;
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState();
  const drinks = useSelector((state) => state.drinks);
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    close();
    drinkId && closeDrink();
    e.preventDefault();
    if (!isNaN(+info) && +info > 0) {
      drinkId = +info;
    } else {
      location = info;
    }
    let ownerId = sessionUser.id;
    dispatch(
      postCheckin({
        rating,
        description,
        drinkId,
        image,
        ownerId,
        location,
      })
    );
    setDescription("");
  };

  const locations = useSelector((state) => state.locations);
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
  let locationNames = [...new Set(locations.map(({ name }) => name))];
  return (
    <>
      <h1>Checkin</h1>
      <form onSubmit={handleSubmit} className="checkinForm">
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
        <div id="dropDown">
          <select
            name="info"
            id="info"
            onChange={(e) => setInfo(e.target.value)}
            required={!drinkId}
          >
            <option value="" disabled selected>
              {drinkId ? "Select a Coffee Shop" : "Select a Coffee"}
            </option>
            {drinkId &&
              locationNames.map((name, indx) => (
                <option key={indx} value={name}>
                  {name}
                </option>
              ))}
            {!drinkId &&
              drinks.map(({ id, name }) => (
                <option key={+id} value={+id}>
                  {name}
                </option>
              ))}
          </select>
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
