import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import Geocode from "react-geocode";
import "./UserInfo.css";
import { useState } from "react";

export default function UserInfo({ coords, city, setCity }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let { name, profile_image, username, location } = sessionUser;

  useEffect(() => {
    if (coords) {
      Geocode.setApiKey("AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA");
      Geocode.setLocationType("ROOFTOP");
      (async () => {
        let cityInfo = await Geocode.fromLatLng(coords?.lat, coords?.lng);
        let cityExact = `${cityInfo.results?.[0]?.address_components?.[2]?.long_name}, ${cityInfo.results?.[0]?.address_components?.[5]?.short_name}`;
        if (cityExact) setCity(cityExact);
      })();
    }
  }, [coords]);

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
          {city || location}
        </div>
      </NavLink>
      <NavLink to="/drinks" className="card drinks">
        <h2>Drinks</h2>
      </NavLink>
      <NavLink to="/locations" className="card locations">
        <h2>Coffee Shops</h2>
      </NavLink>
      <button onClick={logout}>Log Out</button>
    </>
  );
}
