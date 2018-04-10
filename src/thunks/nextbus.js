import { fetchMuniLocations } from "../services/nextbus";

export const getMuniLocations = () => {
  return (dispatch, getState) => {
    return fetchMuniLocations().then(
      (data) => {
        console.log(data);
      }
    )
  }
};