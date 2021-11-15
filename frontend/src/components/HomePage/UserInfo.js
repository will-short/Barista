import React from "react";
import { useSelector } from "react-redux";
import "./UserInfo.css";

export default function UserInfo() {
  const sessionUser = useSelector((state) => state.session.user);
  let { name, profile_image, username, location } = sessionUser;
  return (
    <article>
      <div className="sb_user">
        <div className="user-image">
          <img src={profile_image} alt="" />
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
