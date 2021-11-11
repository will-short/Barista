import { csrfFetch } from "../store/csrf";

const LOADDRINKS = "drinks/LOADDRINKS";

const load = (drinks) => ({
  type: LOADDRINKS,
  drinks,
});

export const getAllDrinks = () => async (dispatch) => {
  const response = await csrfFetch("/api/drinks");
  const drinks = await response.json();

  dispatch(load(drinks));
  return drinks;
};

export default function drinksReducer(state = [], action) {
  switch (action.type) {
    case LOADDRINKS:
      return [...state, ...action.drinks];
    default:
      return state;
  }
}
