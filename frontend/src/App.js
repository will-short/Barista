import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import Locations from "./components/Locations";
import { getAllDrinks } from "./store/drinks";
import ProfilePage from "./components/ProfilePage";
import { getAllCheckins } from "./store/checkins";

function App() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({});
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

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
