import { csrfFetch } from "../store/csrf";
const LOADLOCATIONS = "locations/LOADLOCATIONS";
const load = (locations) => ({
  type: LOADLOCATIONS,
  locations,
});
//https://maps.googleapis.com/maps/api/place/textsearch/json
export const getAllLocations = (lat, lng) => async (dispatch) => {
  const response = await fetch(`/api/locations/${lat},${lng}`);
  const locations = await response.json();
  dispatch(load(locations));
  return locations;
};
export default function locationsReducer(state = [], action) {
  switch (action.type) {
    case LOADLOCATIONS:
      if (JSON.stringify(state) === JSON.stringify(action.locations))
        return state;
      return [...action.locations];
    default:
      return state;
  }
}
