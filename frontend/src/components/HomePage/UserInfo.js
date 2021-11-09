import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./UserInfo.css";
export default function UserInfo() {
  const defaultProfileImg =
    "https://res.cloudinary.com/dc9htgupc/image/upload/v1636321298/y7ig5h9stnxi2zcjrix4.png";

  const sessionUser = useSelector((state) => state.session.user);
  let { name, profile_image, username, location } = sessionUser;
  return (
    <article>
      <div className="sb_user">
        <div className="user-image">
          <img src={profile_image ? profile_image : defaultProfileImg} alt="" />
        </div>
        <div className="info">
          <h2>{name}</h2>
          <div>
            <i className="material-icons">person</i>
            {username}
          </div>
          <div>
            <i className="material-icons">place</i>
            {location}
          </div>
        </div>
      </div>
    </article>
  );
}
