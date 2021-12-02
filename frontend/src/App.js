import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import { getAllDrinks } from "./store/drinks";
import { getAllCheckins } from "./store/checkins";
import { getAllLocations } from "./store/locations";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllDrinks());

    navigator.geolocation.getCurrentPosition((loca) => {
      dispatch(
        sessionActions.getLocation({
          lat: +loca.coords.latitude,
          lng: +loca.coords.longitude,
        })
      );
    });
    dispatch(getAllCheckins());
  }, [dispatch]);

  return <>{isLoaded && <HomePage />}</>;
}

export default App;
