import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Locations.css";
import GoogleMapReact from "google-map-react";
import Marker from "./markers";
import { getAllLocations } from "../../store/locations";

export default function Locations() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (location) => {
    setLocation({
      location: true,
      coordinates: {
        lat: +location.coords.latitude,
        lng: +location.coords.longitude,
      },
    });
  };

  navigator.geolocation.getCurrentPosition(onSuccess);
  let locations = useSelector((state) => state.locations);
  if (!locations.length)
    dispatch(
      getAllLocations(location.coordinates.lat, location.coordinates.lng)
    );

  const zoom = 12;

  return (
    <div id="locations">
      <div id="mapWrapper">
        <GoogleMapReact
          apiKey={"AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA"}
          bootstrapURLKeys={{
            key: "AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA",
          }}
          center={location.coordinates}
          defaultZoom={zoom}
          onCenterChanged={(e) => console.log("works!!!!!!")}
        >
          {locations?.map(({ geometry, name, vicinity, photos }, index) => (
            <Marker
              key={index}
              lat={+geometry.location.lat}
              lng={+geometry.location.lng}
              name={name}
              vicinity={vicinity}
              photos={photos}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}
