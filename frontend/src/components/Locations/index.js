import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckinFeed from "../CheckinFeed";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./Locations.css";
import GoogleMapReact from "google-map-react";

// function MyMapComponent({ center, zoom }) {
//   const [place, setPlace] = useState();
//   const ref = useRef();
//   let map;
//   useEffect(() => {
//     let map = new window.google.maps.Map(ref.current, {
//       center,
//       zoom,
//     });
//     const marker1 = {
//       position: { lat: 40.51076, lng: -88.99346 },
//       map,
//     };
//     new window.google.maps.Marker(marker1);
//   });

//   return (
//     <div id="mapWrapper">
//       <div ref={ref} id="map" />
//     </div>
//   );
// }

export default function Locations() {
  const center = { lat: 40.4842, lng: -88.99369 };
  const zoom = 12;
  return (
    <div id="locations">
      <div id="mapWrapper">
        <GoogleMapReact
          apiKey={"AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA"}
          bootstrapURLKeys={{ key: "AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA" }}
          defaultCenter={center}
          defaultZoom={zoom}
        ></GoogleMapReact>
      </div>
    </div>
  );
}
