import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../store/comments";
import "./CommentForm.css";

export default function CheckinForm({ checkinId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      postComment({ content, checkinId, owner_id: sessionUser?.id })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    setContent("");
  };

  return (
    <div id="commentForm">
      <h3
        onClick={() =>
          showCommentForm ? setShowCommentForm(false) : setShowCommentForm(true)
        }
      >
        Create Comment
      </h3>
      {showCommentForm && (
        <form onSubmit={handleSubmit}>
          <div id="commentText">
            <textarea
              placeholder="Comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p>{errors.password}</p>
          </div>
          <button type="submit" id="commentSubmit">
            Comment!
          </button>
        </form>
      )}
    </div>
  );
}
