import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCheckins } from "../../store/checkins";
import "./CheckinFeed.css";
import Checkin from "./Checkin";

export default function CheckinFeed() {
  const dispatch = useDispatch();
  const checkins = useSelector((state) => state.checkins.checkins);

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
              <Checkin
                data={{
                  description,
                  drink_id,
                  image,
                  location_id,
                  rating,
                  owner_id,
                  id,
                  Drink,
                  User,
                }}
              />
            )
          )}
      </ul>
    </div>
  );
}
