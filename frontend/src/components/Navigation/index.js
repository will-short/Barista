import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "../../images/Barista-logo-text.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="userAuth">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <nav>
      <NavLink id="home" exact to="/">
        <img src={logo} alt="" />
      </NavLink>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
