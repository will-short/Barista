import "./ProfilePage.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import logo from "../../images/Barista-logo-text.png";

export default function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  let { name, profile_image, username, location } = sessionUser;
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
      <div id="postedCheckins"></div>
      <div id="commentedCheckins"></div>
    </div>
  );
}
