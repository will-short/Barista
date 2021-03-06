import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
// import DrinkModal from "../DrinkModal";
import "./Navigation.css";
import logo from "../../images/Barista-logo-text.png";

let searchDiv;

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks);
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
  searchDiv = document.querySelector(".search");
  function drinkList(e) {
    if (!drinks.length) {
      setHideList(true);
      return;
    }
    e.target.nextElementSibling.style.display = "block";
  }
  function filter(e) {
    setSearch(e.target.value.toLowerCase());
  }

  useEffect(() => {}, [hideList]);
  return (
    <nav>
      <div>
        <NavLink id="home" exact to="/">
          <img src={logo} alt="" />
        </NavLink>
        <NavLink id="locations" to="/locations">
          Coffee Shops
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
        <div className="search">
          <input
            type="search"
            placeholder="Find a Drink"
            id="searchBar"
            onFocus={drinkList}
            onChange={filter}
          />

          <div className="drinks-list" style={{ display: "none" }}>
            {drinks.map(({ name, image, id }) => {
              if (name?.toLowerCase().startsWith(search) || !search) return; // <DrinkModal key={id} name={name} image={image} drinkId={id} />
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
document.addEventListener("mousedown", (event) => {
  if (
    searchDiv.lastChild.contains(event.target) ||
    searchDiv.firstChild.contains(event.target)
  ) {
    searchDiv.lastChild.style.display = "block";
  } else {
    let drinkList = document.querySelector(".drinks-list");
    drinkList && (drinkList.style.display = "none");
  }
});
export default Navigation;
