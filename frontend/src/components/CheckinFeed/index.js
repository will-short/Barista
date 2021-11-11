import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCheckins } from "../../store/checkins";
import "./CheckinFeed.css";
import Checkin from "./Checkin";

export default function CheckinFeed() {
  const dispatch = useDispatch();
  const checkins = useSelector((state) => state.checkins);

  if (JSON.stringify(checkins) === "{}") dispatch(getAllCheckins());
  return (
    <div className="checkinFeedContainer">
      <div className="checkinHeader">
        <label htmlFor="all">
          <input type="radio" name="header" id="all" />
          <span>Latest Checkins</span>
        </label>
        <label htmlFor="yours">
          <input type="radio" name="header" id="yours" checked />
          <span>Your Checkins</span>
        </label>
      </div>
      <ul>
        {checkins &&
          Object.values(checkins)
            .reverse()
            .map(
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
                Comments,
              }) => (
                <Checkin
                  key={id}
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
                    Comments,
                  }}
                />
              )
            )}
      </ul>
    </div>
  );
}
