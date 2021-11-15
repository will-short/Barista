import "./ProfilePage.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import logo from "../../images/Barista-logo-text.png";
import CheckinFeed from "../CheckinFeed";

export default function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const checkins = useSelector((state) => state.checkins);
  let { name, profile_image, username, location, id } = sessionUser;
  const userCheckins = Object.values(checkins).filter(
    ({ owner_id }) => +owner_id === +id
  );
  const userComments = Object.values(checkins).filter(({ Comments }) =>
    Comments?.some(({ owner_id }) => owner_id === id)
  );
  // console.log(userComments);
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
        <h2>Your Checkins</h2>
        <CheckinFeed checkins={userCheckins} />
      </div>
      <div id="commentedCheckins">
        <h2>Checkins you commented on</h2>
        <CheckinFeed checkins={userComments} />
      </div>
    </div>
  );
}
