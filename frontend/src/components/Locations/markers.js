import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Locations.css";
import GoogleMapReact from "google-map-react";
import "./markers.css";
import CheckinFormModal from "../CheckinFormModal";

export default function Marker({ name, vicinity, photos }) {
  const [show, setShow] = useState(true);
  let photoRef = photos ? photos[0].photo_reference : null;
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
            <CheckinFormModal />
          </>
        )}
      </div>
    </div>
  );
}
