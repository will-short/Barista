import { csrfFetch } from "../store/csrf";

const LOADCHECKINS = "drinks/LOADCHECKINS";
//TODO: fix everything to not just load all
const load = (checkins) => ({
  type: LOADCHECKINS,
  checkins,
});

export const postCheckin = (checkin) => async (dispatch) => {
  const response = await csrfFetch("/api/checkins", {
    method: "POST",
    body: JSON.stringify(checkin),
  });
  dispatch(load([]));
};
export const deleteCheckin = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/checkins/${id}`, {
    method: "DELETE",
  });
  const checkins = await response.json();

  dispatch(load(checkins));
  return checkins;
};
export const editCheckin = (id, update) => async (dispatch) => {
  const response = await csrfFetch(`/api/checkins/${id}`, {
    method: "PUT",
    body: JSON.stringify({ update }),
  });
  const checkins = await response.json();

  dispatch(load(checkins));
  return checkins;
};

export const getAllCheckins = () => async (dispatch) => {
  const response = await csrfFetch("/api/checkins");
  const checkins = await response.json();

  dispatch(load(checkins));
  return checkins;
};

export default function checkinsReducer(state = { checkins: [] }, action) {
  switch (action.type) {
    case LOADCHECKINS:
      return { ...state, checkins: [...action.checkins] };
    default:
      return state;
  }
}
