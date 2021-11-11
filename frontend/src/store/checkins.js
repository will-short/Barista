import { csrfFetch } from "../store/csrf";

const LOADCHECKINS = "checkins/LOADCHECKINS";
const ADDCHECKIN = "checkins/ADDCHECKIN";
const DELETECHECKIN = "checkins/DELETECHECKIN";
const EDITCHECKIN = "checkins/EDITCHECKIN";
const POSTCOMMENT = "checkins/POSTCOMMENT";
//TODO: fix everything to not just load all
const load = (checkins) => ({
  type: LOADCHECKINS,
  checkins,
});
const add = (checkin) => ({
  type: ADDCHECKIN,
  checkin,
});
const remove = (checkin) => ({
  type: DELETECHECKIN,
  checkin,
});
const edit = (checkin) => ({
  type: EDITCHECKIN,
  checkin,
});
const addComment = (comment) => ({
  type: POSTCOMMENT,
  comment,
});

export const postCheckin = (checkin) => async (dispatch) => {
  const response = await csrfFetch("/api/checkins", {
    method: "POST",
    body: JSON.stringify(checkin),
  });
  let newCheckin = await response.json();
  dispatch(add(newCheckin));
  return newCheckin;
};
export const deleteCheckin = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/checkins/${id}`, {
    method: "DELETE",
  });
  const checkin = await response.json();

  dispatch(remove(checkin));
  return checkin;
};
export const editCheckin = (id, update) => async (dispatch) => {
  const response = await csrfFetch(`/api/checkins/${id}`, {
    method: "PUT",
    body: JSON.stringify({ update }),
  });
  const checkin = await response.json();

  dispatch(edit(checkin));
  return checkin;
};

export const getAllCheckins = () => async (dispatch) => {
  const response = await csrfFetch("/api/checkins");
  const checkins = await response.json();

  dispatch(load(checkins));
  return checkins;
};

export const postComment = (comment) => async (dispatch) => {
  const response = await csrfFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(comment),
  });

  const newComment = await response.json();
  dispatch(addComment(newComment));
  return newComment;
};

export default function checkinsReducer(state = {}, action) {
  switch (action.type) {
    case LOADCHECKINS:
      for (let checkin of action.checkins) {
        state[checkin.id] = checkin;
      }
      return { ...state };
    case EDITCHECKIN:
      state[action.checkin.id].description = action.checkin.description;
      return { ...state };
    case ADDCHECKIN:
      return { ...state, [action.checkin.id]: action.checkin };
    case DELETECHECKIN:
      delete state[action.checkin.id];
      return { ...state };
    case POSTCOMMENT:
      const checkin = state[action.comment.checkin_id];
      if (checkin.Comments) checkin.Comments.push(action.comment);
      else checkin.Comments = [action.comment];
      return { ...state };
    default:
      return state;
  }
}
