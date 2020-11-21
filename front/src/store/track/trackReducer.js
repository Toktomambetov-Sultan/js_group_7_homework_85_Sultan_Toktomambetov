import { CLEAN_TRACKS_DATA, SET_TRACKS_DATA } from "../actionsTypes";

const initialState = {
  data: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS_DATA:
      return {
        ...state,
        data: action.data,
      };
    case CLEAN_TRACKS_DATA:
      return {
        ...state,
        data: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
