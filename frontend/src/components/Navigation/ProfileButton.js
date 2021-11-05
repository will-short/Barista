import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div id="position">
      <div id="profile-container">
        <button className="profile" onClick={openMenu}>
          <i class="material-icons-outlined">account_circle</i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <i className="material-icons-outlined">feed</i>
              <Link>Recent Activity</Link>
            </li>
            <li>
              <i className="material-icons-outlined">account_circle</i>
              <Link>My Profile</Link>
            </li>
            <li>
              <i className="material-icons-outlined">manage_accounts</i>
              <Link>Account Settings</Link>
            </li>
            <li>
              <button id="logout" onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
