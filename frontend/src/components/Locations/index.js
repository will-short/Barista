import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Locations.css";
import GoogleMapReact from "google-map-react";
import Marker from "./markers";
import { getAllLocations } from "../../store/locations";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "./cities.json";
import Geocode from "react-geocode";

export default function Locations({ city }) {
  const dispatch = useDispatch();
  let locations = useSelector((state) => state.locations);
  const sessionCoords = useSelector((state) => state.session.coords);
  const [newCity, setNewCity] = useState(city);
  const [coords, setCoords] = useState(sessionCoords);
  useEffect(() => {
    dispatch(getAllLocations(sessionCoords));
    console.log(sessionCoords);
    setNewCity(city);
  }, [dispatch, city]);

  const zoom = 12;
  return (
    <div id="locations">
      <Autocomplete
        clearOnEscape
        id="cities"
        options={cities}
        sx={{ width: 300 }}
        value={newCity}
        renderInput={(params) => (
          <TextField {...params} label="City" variant="filled" />
        )}
        onChange={(event, newValue) => {
          setNewCity(newValue);
          Geocode.fromAddress(newValue).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setCoords({ lat, lng });
              dispatch(getAllLocations({ lat, lng }));
            },
            (error) => {
              console.error(error);
            }
          );
        }}
      />
      <div id="mapWrapper">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA",
          }}
          defaultCenter={sessionCoords}
          center={coords}
          defaultZoom={zoom}
        >
          {locations.map(
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
