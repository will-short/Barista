import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import UserInfo from "./UserInfo";
import CheckinFeed from "../CheckinFeed";
import { getAllLocations } from "../../store/locations";
import logo from "../../images/logo-text-nobg.png";
import { Route, Switch, NavLink } from "react-router-dom";
import Locations from "../Locations";
import ProfilePage from "../ProfilePage";
import DrinksPage from "../DrinksPage";

export default function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionCoords = useSelector((state) => state.session.coords);
  const checkins = useSelector((state) => state.checkins);
  const locations = useSelector((state) => state.locations);

  useEffect(() => {
    if (locations < 1) {
      dispatch(getAllLocations(sessionCoords));
    }
  }, [dispatch]);

  let sideBar;
  if (sessionUser) {
    sideBar = <UserInfo />;
  } else {
    sideBar = (
      <article className="logged-out-info">
        <h2>Welcome to Barista, an Untappd clone.</h2>
        <h3>
          If you want to explore without creating a account click on the Demo
          User button!
        </h3>
      </article>
    );
  }
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <div className="checkin-feed">
            <h2 className="pop">Recent Activity</h2>
            <div className="checkinFeedContainer">
              <CheckinFeed checkins={checkins} />
            </div>
          </div>
        </Route>
        <Route path="/locations">
          <Locations />
        </Route>
        <Route path="/drinks">
          <DrinksPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
      </Switch>
      <aside>
        <NavLink exact to="/" className="home">
          <img src={logo} alt="" />
        </NavLink>
        {sideBar}
      </aside>
    </main>
  );
}
