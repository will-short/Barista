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
      <img
        src="https://res.cloudinary.com/dc9htgupc/image/upload/c_crop,g_east,h_900,w_3400/v1636839742/cs80o2jkayxzlxzpkjni.jpg"
        id="profileHeader"
      ></img>
      <div id="postedCheckins"></div>
      <div id="commentedCheckins"></div>
    </div>
  );
}
