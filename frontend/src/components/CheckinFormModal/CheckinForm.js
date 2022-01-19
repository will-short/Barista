import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postCheckin } from "../../store/checkins";
import * as sessionActions from "../../store/session";
import Rating from "@mui/material/Rating";

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

  async function imageSubmit(e) {
    let uploadedImage = await dispatch(
      sessionActions.uploadImage(e.target.files[0])
    );
    setImage(uploadedImage);
  }

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
            onChange={imageSubmit}
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
          Rating:
          <Rating
            name="rating"
            value={+rating}
            onChange={(e) => setRating(e.target.value)}
            precision={0.5}
            size="large"
          />
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
