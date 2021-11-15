import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../store/checkins";
import "./CommentForm.css";

export default function CheckinForm({ checkinId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [textLength, setTextLength] = useState(0);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextLength(0);
    return dispatch(
      postComment({ content, checkinId, owner_id: sessionUser?.id })
    );
  };

  if (sessionUser) {
    return (
      <div id="commentForm">
        <h3
          onClick={() =>
            showCommentForm
              ? setShowCommentForm(false)
              : setShowCommentForm(true)
          }
        >
          Create Comment
        </h3>
        {showCommentForm && (
          <form
            className="comment"
            onSubmit={(e) => {
              handleSubmit(e);
              setContent("");
            }}
          >
            <div id="commentText">
              <textarea
                placeholder="Comment"
                value={content}
                name="content"
                onChange={(e) => {
                  setTextLength(e.target.value.length);
                  setContent(e.target.value);
                }}
              ></textarea>
              <span className={textLength <= 0 || textLength > 40 ? "dis" : ""}>
                {textLength}/40
              </span>
            </div>
            <button
              type="submit"
              id="commentSubmit"
              disabled={textLength <= 0 || textLength > 40}
            >
              Comment!
            </button>
          </form>
        )}
      </div>
    );
  }
  return null;
}
