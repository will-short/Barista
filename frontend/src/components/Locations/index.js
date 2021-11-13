import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Locations.css";
import GoogleMapReact from "google-map-react";
import Marker from "./markers";
import { getAllLocations } from "../../store/locations";

export default function Locations() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });
  const onSuccess = (loca) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: +loca.coords.latitude,
        lng: +loca.coords.longitude,
      },
    });
  };
  useEffect(() => {
    if (locations < 1 && location.loaded) {
      dispatch(
        getAllLocations(location.coordinates.lat, location.coordinates.lng)
      );
    }
  }, [location]);
  navigator.geolocation.getCurrentPosition(onSuccess);
  const dispatch = useDispatch();

  let locations = useSelector((state) => state.locations);
  if (locations < 1 && location.loaded) {
    dispatch(
      getAllLocations(location.coordinates.lat, location.coordinates.lng)
    );
  }

  const zoom = 12;

  return (
    <div id="locations">
      <div id="mapWrapper">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA",
          }}
          defaultCenter={location.coordinates}
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
