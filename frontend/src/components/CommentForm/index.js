import React, { useState } from "react";
import {} from "../../store/checkins";
import { useDispatch, useSelector } from "react-redux";
import { postCheckin } from "../../store/checkins";
import "./CommentForm.css";

export default function CheckinForm() {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(
  //     postCheckin({ rating, description, drinkId, image, ownerId })
  //   ).catch(async (res) => {
  //     const data = await res.json();
  //     if (data && data.errors) setErrors(data.errors);
  //   });
  // };

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
        <form>
          <div id="commentText">
            <textarea
              placeholder="Comment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
