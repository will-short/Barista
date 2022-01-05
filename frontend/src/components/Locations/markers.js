import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Locations.css";
import "./markers.css";
import CheckinFormModal from "../CheckinFormModal";

export default function Marker({ name, vicinity, photos }) {
  const [show, setShow] = useState(true);
  let photoRef = photos ? photos[0].photo_reference : null;
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div id="markerWrapper">
      <div id="marker" onClick={show && (() => setShow(!show))}>
        {show ? (
          <span>{name}</span>
        ) : (
          <>
            <span onClick={() => setShow(!show)}>{name}</span>
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA`}
              alt=""
              onClick={() => setShow(!show)}
            />
            <span onClick={() => setShow(!show)}>Location: {vicinity}</span>
            {sessionUser && <CheckinFormModal location={name} />}
          </>
        )}
      </div>
    </div>
  );
}

// https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoRef}&key=AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA
