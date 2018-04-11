import { fetchMuniLocations } from "../services/nextbus";
import { setMuniLocs } from "../actions/mapInfo";

export const getMuniLocations = () => {
  return (dispatch, getState) => {
    return fetchMuniLocations().then(
      (data) => {
        console.log(data);
        dispatch(setMuniLocs(data));
      }
    )
  }
};