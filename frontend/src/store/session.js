import { csrfFetch } from "./csrf";
import Geocode from "react-geocode";

const SETUSER = "session/SETUSER";
const REMOVEUSER = "session/removeUser";
const SETLOCATION = "session/SETLOCATION";

//set user action
const setUser = (user) => ({
  type: SETUSER,
  user,
});

//remove user action
const removeUser = () => {
  return {
    type: REMOVEUSER,
  };
};

const setLocation = (location) => ({
  type: SETLOCATION,
  location,
});

//thunk to login a user
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
//thunk to signup a user
export const signup = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//thunk to logout a user
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

//thunk to restore user
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//image upload
export const uploadImage = (image) => async (dispatch) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "ubllb9oo");
  data.append("cloud_name", "dc9htgupc");
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dc9htgupc/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const resData = await response.json();
  let split = resData.url.split("upload");
  return `${split[0]}upload/c_fill,h_200,w_200${split[1]}`;
};

//user geo-location
export const getLocation = () => async (dispatch) => {
  navigator.geolocation.getCurrentPosition(
    (loca) => {
      dispatch(
        setLocation({
          lat: +loca.coords.latitude,
          lng: +loca.coords.longitude,
        })
      );
    },
    (error) => {
      if (error.code == error.PERMISSION_DENIED) {
        dispatch(
          setLocation({
            lat: 41.8781136,
            lng: -87.6297982,
          })
        );
      }
    }
  );
};

const sessionReducer = (state = { user: null }, action) => {
  let newState;
  switch (action.type) {
    case SETUSER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVEUSER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SETLOCATION:
      newState = Object.assign({}, state);
      newState.coords = action.location;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
