import { csrfFetch } from "./csrf";

const SETUSER = "session/SETUSER";
const REMOVEUSER = "session/removeUser";

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
  const { name, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      name,
      username,
      email,
      password,
    }),
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
    default:
      return state;
  }
};

export default sessionReducer;
