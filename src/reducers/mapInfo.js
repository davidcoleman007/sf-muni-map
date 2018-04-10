import { SET_NEIGHBORHOODS } from "../actions/mapInfo";

const initialState = {
  neighborhoods : {},
  streets       : {}
};

const mapInfo = (state = initialState, action) => {
  switch(action.type) {
    case SET_NEIGHBORHOODS:
      return {
        ...state,
        neighborhoods: action.data
      };
    default:
      return state;
  };
};

export default mapInfo;