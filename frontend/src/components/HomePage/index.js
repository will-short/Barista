import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import UserInfo from "./UserInfo";
import CheckinFeed from "../CheckinFeed";

export default function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const checkins = useSelector((state) => state.checkins);

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
          <div className="checkinHeader">
            <label htmlFor="all">
              <input type="radio" name="header" id="all" />
              <span>Latest Checkins</span>
            </label>
            <label htmlFor="yours">
              <input type="radio" name="header" id="yours" checked />
              <span>Your Checkins</span>
            </label>
          </div>
          <CheckinFeed checkins={checkins} />
        </div>
      </div>
      <aside>{sideBar}</aside>
    </main>
  );
}
