import "./ProfilePage.css";
import React from "react";
import { useSelector } from "react-redux";

import CheckinFeed from "../CheckinFeed";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";

export default function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const checkins = useSelector((state) => state.checkins);
  const [alignment, setAlignment] = useState("checkins");
  const [checkinsToggle, setCheckinsToggle] = useState(true);
  let { name, profile_image, username, location, id } = sessionUser;
  const userCheckins = Object.values(checkins).filter(
    ({ owner_id }) => +owner_id === +id
  );
  const userComments = Object.values(checkins).filter(({ Comments }) =>
    Comments?.some(({ owner_id }) => owner_id === id)
  );

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === "comments") {
      setCheckinsToggle(false);
    } else {
      setCheckinsToggle(true);
    }
  };

  return (
    <div id="profileMain">
      <div id="profileHeader">
        <div id="info">
          <img src={profile_image} alt="" />
          <h2>{name}</h2>
          <div>{username}</div>
          <div>{location}</div>
        </div>
      </div>
      <div id="postedCheckins">
        <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
          <ToggleButton value="checkins">Checkins</ToggleButton>
          <ToggleButton value="comments">Comments</ToggleButton>
        </ToggleButtonGroup>
        <CheckinFeed checkins={checkinsToggle ? userCheckins : userComments} />
      </div>
    </div>
  );
}
