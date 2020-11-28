import {
  CHANGE_CURRENT_TRACK,
  CLEAN_TRACKS_DATA,
  SET_TRACKS_DATA,
} from "../actionsTypes";

const initialState = {
  data: [],
  current: {
    name: "",
    lasting: "",
    author: null,
    album: null,
  },
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
    case CHANGE_CURRENT_TRACK:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.data,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
