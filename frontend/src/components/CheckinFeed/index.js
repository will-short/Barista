import React from "react";
import { useDispatch } from "react-redux";
import { getAllCheckins } from "../../store/checkins";
import "./CheckinFeed.css";
import Checkin from "./Checkin";

export default function CheckinFeed({ checkins }) {
  const dispatch = useDispatch();

  if (JSON.stringify(checkins) === "{}") dispatch(getAllCheckins());
  return (
    <ul>
      {checkins &&
        Object.values(checkins)
          .reverse()
          .map(
            ({
              description,
              drink_id,
              image,
              rating,
              owner_id,
              id,
              Drink,
              User,
              Comments,
              location,
            }) => (
              <Checkin
                key={id}
                data={{
                  description,
                  drink_id,
                  image,
                  rating,
                  owner_id,
                  id,
                  Drink,
                  User,
                  Comments,
                  checkinLocation: location,
                }}
              />
            )
          )}
    </ul>
  );
}
