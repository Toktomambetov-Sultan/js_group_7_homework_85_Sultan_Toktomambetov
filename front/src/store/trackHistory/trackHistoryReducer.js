import { SET_TRACK_LIST, FETCH_T_ERROR } from "../actionsTypes";

const initialState = {
  trackList: [],
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK_LIST:
      return {
        ...state,
        trackList: action.data,
      };
    case FETCH_T_ERROR:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
