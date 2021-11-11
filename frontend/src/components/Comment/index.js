import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCheckins,
  deleteCheckin,
  editCheckin,
} from "../../store/checkins";
import CommentForm from "../CommentForm";
import { checkinComments } from "../../store/comments";
import "./Comment.css";

export default function Comment({ data }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { id, content, User } = data;
  const [value, setValue] = useState(content);

  if (sessionUser?.id !== User?.id) return <li>{content}</li>;

  return (
    <li className="updateComment">
      <button className="deleteComment">Delete</button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="updateComment"
      />
      {value !== content && <button className="updateComment">Update</button>}
    </li>
  );
}
