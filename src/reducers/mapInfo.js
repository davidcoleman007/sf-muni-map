import { SET_MUNI_LOCS } from "../actions/mapInfo";

const initialState = {
  muniLocs : [],
};

const mapInfo = (state = initialState, action) => {
  switch(action.type) {
    case SET_MUNI_LOCS:
      return {
        ...state,
        muniLocs: action.data
      };
    default:
      return state;
  }
};

export default mapInfo;