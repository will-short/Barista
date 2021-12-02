import { csrfFetch } from "../store/csrf";
const LOADLOCATIONS = "locations/LOADLOCATIONS";
const load = (locations) => ({
  type: LOADLOCATIONS,
  locations,
});
export const getAllLocations = (lat, lng) => async (dispatch) => {
  const response = await csrfFetch(`/api/locations/${lat},${lng}`);
  const locations = await response.json();
  dispatch(load(locations));
  return locations;
};
export default function locationsReducer(state = [], action) {
  switch (action.type) {
    case LOADLOCATIONS:
      return [...action.locations];
    default:
      return state;
  }
}
