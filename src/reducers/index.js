import { combineReducers } from 'redux';
import mapInfo from './mapInfo';
console.log(mapInfo);
//  we only have one here now but we would have more in a real app
export default combineReducers({
  mapInfo,
})