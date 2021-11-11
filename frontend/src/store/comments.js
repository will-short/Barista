import { csrfFetch } from "../store/csrf";

const LOADCOMMENTS = "comments/LOADCOMMENTS";

const load = (comments) => ({
  type: LOADCOMMENTS,
  comments,
});

export default function commentsReducer(state = { comments: [] }, action) {
  switch (action.type) {
    case LOADCOMMENTS:
      return { ...state, comments: [...action.comments] };
    default:
      return state;
  }
}
