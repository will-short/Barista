import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../store/checkins";
import CommentForm from "../CommentForm";
import "./Comment.css";

export default function Comment({ data }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id, content, User } = data;
  const [value, setValue] = useState(content);

  if (sessionUser?.id !== User?.id) return <li>{content}</li>;
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
      {value !== content && (
        <button className="updateComment" onClick={updateComment}>
          Update
        </button>
      )}
    </li>
  );
}
