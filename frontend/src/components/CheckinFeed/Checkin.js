import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCheckins,
  deleteCheckin,
  editCheckin,
} from "../../store/checkins";

export default function Checkin({ data }) {
  let {
    description,
    drink_id,
    image,
    location_id,
    rating,
    owner_id,
    id,
    Drink,
    User,
  } = data;
  console.log(description);
  const [updateDisc, setUpdateDisc] = useState();
  const dispatch = useDispatch();
  const defaultProfileImg =
    "https://res.cloudinary.com/dc9htgupc/image/upload/v1636321298/y7ig5h9stnxi2zcjrix4.png";
  const sessionUser = useSelector((state) => state.session.user);
  async function deleteCheckinAction(id) {
    await dispatch(deleteCheckin(id));
  }
  function updateCheckin(update) {
    dispatch(editCheckin(id, update));
  }
  const checkins = useSelector((state) => state.checkins.checkins);
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
        <h3>
          {User?.name ? User?.name : User?.username}
          <span>is drinking a</span>
          {Drink?.name}
        </h3>
        <div className="starRating">{stars(+rating)}</div>
      </div>
      <img src={image} alt="" className="checkinImage" />
      <div className="checkinMain">
        {sessionUser?.id === owner_id ? (
          <div>
            <input
              type="text"
              name="description"
              id="descriptionfield"
              value={updateDisc || description}
              onChange={(e) => setUpdateDisc(e.target.value)}
            />
            {description !== updateDisc && (
              <button
                className="update"
                onClick={(e) => updateCheckin(updateDisc)}
              >
                update
              </button>
            )}
          </div>
        ) : (
          <div>{description}</div>
        )}
        <div>
          {sessionUser?.id === owner_id && (
            <button
              className="deleteButton"
              onClick={() => deleteCheckinAction(id)}
            >
              Delete Checkin
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
