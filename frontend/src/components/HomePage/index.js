import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./HomePage.css";
import UserInfo from "./UserInfo";
export default function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);
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
      </div>
      <aside>{sideBar}</aside>
    </main>
  );
}
