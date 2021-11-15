import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCheckins,
  deleteCheckin,
  editCheckin,
} from "../../store/checkins";
import CommentForm from "../CommentForm";
import Comment from "../Comment";
import { useLocation } from "react-router-dom";

export default function Checkin({ data }) {
  let {
    description,
    checkinLocation,
    image,
    rating,
    owner_id,
    id,
    Drink,
    User,
    Comments,
  } = data;

  const [updateDisc, setUpdateDisc] = useState(description);
  const dispatch = useDispatch();
  const location = useLocation();
  const defaultProfileImg =
    "https://res.cloudinary.com/dc9htgupc/image/upload/v1636321298/y7ig5h9stnxi2zcjrix4.png";
  const sessionUser = useSelector((state) => state.session.user);
  async function deleteCheckinAction(id) {
    await dispatch(deleteCheckin(id));
  }
  function updateCheckin(update) {
    dispatch(editCheckin(id, update));
  }
  useSelector((state) => state.checkins);
  let url = location.pathname;
  let isProfile = url.endsWith("profile");

  let selfComments = Comments?.filter(
    ({ owner_id }) => +owner_id === +sessionUser.id
  );
  let otherComments = Comments?.filter(
    ({ owner_id }) => +owner_id !== +sessionUser.id
  ).reverse();

  let formattedComments = [];
  if (selfComments) formattedComments = [...selfComments];
  if (otherComments)
    formattedComments = [...formattedComments, ...otherComments];

  function stars(rating) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - i !== 0.5 && rating - i > 0) {
        stars.push(<span className="material-icons">star</span>);
      } else if (rating - i === 0.5) {
        stars.push(<span className="material-icons">star_half</span>);
      } else {
        stars.push(<span class="material-icons">star_border</span>);
      }
    }
    return stars;
  }

  return (
    <li>
      <div className="top">
        <img
          src={User?.profile_image ? User?.profile_image : defaultProfileImg}
          alt=""
          className="profileImage"
        />
        <div id="h3s">
          <h3>
            {User?.name ? User?.name : User?.username}
            <span>is drinking a</span>
            {Drink?.name}
          </h3>
          {checkinLocation && (
            <h3>
              <span>at</span>
              {checkinLocation}
            </h3>
          )}
        </div>
        <div className="starRating">{stars(+rating)}</div>
      </div>
      {sessionUser?.id === owner_id && isProfile ? (
        <div id="descriptionDiv">
          <input
            type="text"
            name="description"
            id="descriptionfield"
            value={updateDisc || description}
            onChange={(e) => setUpdateDisc(e.target.value)}
          />
          <button
            className="update"
            onClick={(e) => updateCheckin(updateDisc)}
            disabled={description === updateDisc}
          >
            update
          </button>
        </div>
      ) : (
        <div id="descriptionDiv">{description}</div>
      )}
      <img src={image} alt="" className="checkinImage" />

      <h3 id="commentHeader">Comments</h3>
      <ul id="commentContainer">
        {formattedComments.map(({ id, content, User }) => (
          <Comment key={id} data={{ id, content, User }} />
        ))}
      </ul>
      <CommentForm checkinId={id} />
      {sessionUser?.id === owner_id && isProfile && (
        <div id="deleteContainer">
          <button
            className="deleteButton"
            onClick={() => deleteCheckinAction(id)}
          >
            Delete Checkin
          </button>
        </div>
      )}
    </li>
  );
}
