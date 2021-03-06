import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCheckin, editCheckin } from "../../store/checkins";
import CommentForm from "../CommentForm";
import Comment from "../Comment";
import { Link, useLocation } from "react-router-dom";

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
  const [expand, setExpand] = useState(false);
  let height = { height: "110px" };
  useEffect(() => {
    if (expand) {
      height = { height: "fit-content" };
    } else {
      height = { height: "110px" };
    }
  }, [expand]);
  const dispatch = useDispatch();
  const location = useLocation();
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

  let formattedComments = [];
  if (sessionUser) {
    let selfComments = Comments?.filter(
      ({ owner_id }) => +owner_id === +sessionUser.id
    );
    let otherComments = Comments?.filter(
      ({ owner_id }) => +owner_id !== +sessionUser.id
    ).reverse();
    if (selfComments) formattedComments = [...selfComments];
    if (otherComments)
      formattedComments = [...formattedComments, ...otherComments];
  } else {
    formattedComments = Comments?.reverse();
  }
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
        <img src={User?.profile_image} alt="" className="profileImage" />
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
          <div></div>
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
        <div id="descriptionDiv">
          <div></div>
          <span>{description}</span>
          {sessionUser?.id === owner_id ? (
            <Link id="pencil" to="/profile">
              <span class="material-icons-outlined">edit</span>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <img src={image} alt="" className="checkinImage" />

      <ul
        id="commentContainer"
        style={expand ? { height: "fit-content" } : { height: "110px" }}
      >
        {formattedComments.map(({ id, content, User }) => (
          <Comment key={id} data={{ id, content, User }} />
        ))}
      </ul>
      {formattedComments.length > 3 && (
        <h4
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? "Collapse" : "Expand"}
        </h4>
      )}
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
