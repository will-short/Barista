import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import UserInfo from "./UserInfo";
import CheckinFeed from "../CheckinFeed";
import { getAllLocations } from "../../store/locations";

export default function HomePage({ location }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const checkins = useSelector((state) => state.checkins);
  const locations = useSelector((state) => state.locations);

  useEffect(() => {
    if (locations < 1 && location.loaded) {
      dispatch(
        getAllLocations(location.coordinates.lat, location.coordinates.lng)
      );
    }
  }, [dispatch]);

  let sideBar;
  if (sessionUser) {
    sideBar = <UserInfo />;
  } else {
    sideBar = (
      <article>
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
      <div className="checkin-feed">
        <h2>Recent Activity</h2>
        <div className="checkinFeedContainer">
          <CheckinFeed checkins={checkins} />
        </div>
      </div>
      <aside>{sideBar}</aside>
    </main>
  );
}
