import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../store/checkins";
import CommentForm from "../CommentForm";
import "./Comment.css";
import { useLocation } from "react-router-dom";

export default function Comment({ data }) {
  const dispatch = useDispatch();
  const location = useLocation();

  let url = location.pathname;
  let isProfile = url.endsWith("profile");
  const sessionUser = useSelector((state) => state.session.user);
  const { id, content, User } = data;
  const [value, setValue] = useState(content);
  const defaultProfileImg =
    "https://res.cloudinary.com/dc9htgupc/image/upload/v1636321298/y7ig5h9stnxi2zcjrix4.png";

  if (sessionUser?.id !== User?.id || !isProfile)
    return (
      <li>
        <img
          src={User.profile_image ? User.profile_image : defaultProfileImg}
          alt=""
          id="commentImg"
        />
        <span>{`${User.username}: ${content}`}</span>
      </li>
    );
  function removeComment() {
    dispatch(deleteComment(id));
  }
  function updateComment() {
    dispatch(editComment(value, id));
  }
  return (
    <li className="updateComment">
      <button className="deleteComment" onClick={removeComment}>
        Delete
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="updateComment"
      />
      <button
        className="updateComment"
        disabled={value === content}
        onClick={updateComment}
      >
        Update
      </button>
    </li>
  );
}
