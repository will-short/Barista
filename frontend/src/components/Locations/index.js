import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Locations.css";
import GoogleMapReact from "google-map-react";
import Marker from "./markers";
import { getAllLocations } from "../../store/locations";

export default function Locations() {
  const dispatch = useDispatch();

  let locations = useSelector((state) => state.locations);
  const sessionCoords = useSelector((state) => state.session.coords);

  if (locations < 1) {
    dispatch(getAllLocations(sessionCoords));
  }

  const zoom = 12;
  if (!sessionCoords) {
    return (
      <h1>
        This feature requires location permissions. Please enable Location and
        reload page
      </h1>
    );
  }

  return (
    <div id="locations">
      <div id="mapWrapper">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA",
          }}
          defaultCenter={sessionCoords}
          center={sessionCoords}
          defaultZoom={zoom}
        >
          {locations?.map(
            ({ geometry, name, formatted_address, photos }, index) => (
              <Marker
                key={index}
                lat={+geometry.location.lat}
                lng={+geometry.location.lng}
                name={name}
                vicinity={formatted_address}
                photos={photos}
              />
            )
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}
