import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import { getAllDrinks } from "../../store/drinks";

import "./Navigation.css";
import logo from "../../images/Barista-logo-text.png";
function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks.drinks);
  const sessionUser = useSelector((state) => state.session.user);
  const [hideList, setHideList] = useState(false);
  const [search, setSearch] = useState("");
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

  function drinkList() {
    if (!drinks.length) dispatch(getAllDrinks());
    setHideList(true);
  }
  function filter(e) {
    setSearch(e.target.value.toLowerCase());
  }
  useEffect(() => {}, [hideList]);
  return (
    <nav>
      <NavLink id="home" exact to="/">
        <img src={logo} alt="" />
      </NavLink>
      <div>
        {isLoaded && sessionLinks}
        <div className="search">
          <input
            type="search"
            placeholder="Find a Drink or Location"
            id="searchBar"
            onFocus={drinkList}
            onBlur={() => setHideList(false)}
            onChange={filter}
          />
          {hideList && (
            <div className="drinks-list">
              {drinks.map(({ name, image, id }) => {
                if (name.toLowerCase().startsWith(search) || !search)
                  return (
                    <button key={id}>
                      <img src={image} alt="" />
                      <div>{name}</div>
                    </button>
                  );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
