import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCheckins } from "../../store/checkins";
import "./CheckinFeed.css";

export default function Navigation() {
  const defaultProfileImg =
    "https://res.cloudinary.com/dc9htgupc/image/upload/v1636321298/y7ig5h9stnxi2zcjrix4.png";
  const dispatch = useDispatch();

  const checkins = useSelector((state) => state.checkins.checkins);
  const sessionUser = useSelector((state) => state.session.user);

  function stars(rating) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - i !== 0.5) {
        stars.push(<span className="material-icons">star</span>);
      } else if (rating - i === 0.5) {
        stars.push(<span className="material-icons">star_half</span>);
      } else {
        stars.push(<span class="material-icons">star_border</span>);
      }
    }
    return stars;
  }
  console.log(checkins);
  if (!checkins.length) dispatch(getAllCheckins());
  return (
    <div className="checkinFeedContainer">
      <div className="checkinHeader">
        <input type="radio" name="header" id="all" />
        <label htmlFor="all">Latest Checkins</label>
        <input type="radio" name="header" id="yours" />
        <label htmlFor="yours">Your Checkins</label>
      </div>
      <ul>
        {checkins.length &&
          checkins.map(
            ({
              description,
              drink_id,
              image,
              location_id,
              rating,
              owner_id,
              id,
              Drink,
              User,
            }) => (
              <li key={id}>
                <div className="top">
                  <img
                    src={
                      User?.profile_image
                        ? User?.profile_image
                        : defaultProfileImg
                    }
                    alt=""
                    className="profileImage"
                  />
                  <h3>
                    {User?.name ? User?.name : User?.username}
                    <span>is drinking a</span>
                    {Drink?.name}
                  </h3>
                  <div className="starRating">{stars(+rating)}</div>
                </div>
                <img src={image} alt="" className="checkinImage" />
                <div className="checkinMain">
                  <div>{description}</div>
                </div>
              </li>
            )
          )}
      </ul>
    </div>
  );
}
