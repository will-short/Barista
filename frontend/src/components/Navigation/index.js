import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";

import "./Navigation.css";
import logo from "../../images/Barista-logo-text.png";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="userAuth">
        <LoginFormModal />
        <SignupFormModal />
        <button
          className="user"
          onClick={() =>
            dispatch(
              sessionActions.login({
                credential: "Demo-lition",
                password: "password",
              })
            )
          }
        >
          Demo User
        </button>
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
