import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";

import "./UserInfo.css";

export default function UserInfo() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let { name, profile_image, username, location } = sessionUser;

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <>
      <NavLink to="/profile" className="user-card">
        <img src={profile_image} alt="" className="user-image" />
        <h2>{name}</h2>
        <div>
          <i className="material-icons">person</i>
          {username}
        </div>
        <div>
          <i className="material-icons">place</i>
          {location}
        </div>
      </NavLink>
      <NavLink to="/" className="card drinks">
        <h2>Drinks</h2>
      </NavLink>
      <NavLink to="/locations" className="card locations">
        <h2>Coffee Shops</h2>
      </NavLink>
      <button onClick={logout}>Log Out</button>
    </>
  );
}
