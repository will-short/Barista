import { csrfFetch } from "../store/csrf";

const LOADCOMMENTS = "comments/LOADCOMMENTS";

const load = (comments) => ({
  type: LOADCOMMENTS,
  comments,
});

export const postComment = (comment) => async (dispatch) => {
  const response = await csrfFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(comment),
  });
  dispatch(load([]));

  const comments = await response.json();
  return comments;
};

export const checkinComments = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`);
  const comments = await response.json();
  console.log(Array.isArray(comments));
  dispatch(load(comments));
  return comments;
};

export default function commentsReducer(state = { comments: [] }, action) {
  switch (action.type) {
    case LOADCOMMENTS:
      return { ...state, comments: [...action.comments] };
    default:
      return state;
  }
}
