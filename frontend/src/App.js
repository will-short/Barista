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

    dispatch(sessionActions.getLocation());
    dispatch(getAllCheckins());
  }, [dispatch]);

  return <>{isLoaded && <HomePage />}</>;
}

export default App;
