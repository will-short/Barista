import { csrfFetch } from "./csrf";

const SETUSER = "session/SETUSER";
const REMOVEUSER = "session/removeUser";

const setUser = (user) => ({
  type: SETUSER,
  user,
});
const removeUser = () => {
  return {
    type: REMOVEUSER,
  };
};

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

const sessionReducer = (state = { user: null }, action) => {
  let newState = {};
  switch (action.type) {
    case SETUSER:
      newState = Object.assign(state);
      newState.user = action.user;
      return newState;
    case REMOVEUSER:
      newState = Object.assign(state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
