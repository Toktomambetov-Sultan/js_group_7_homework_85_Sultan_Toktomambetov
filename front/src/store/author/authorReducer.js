import { CLEAN_AUTHORS_DATA, SET_AUTHORS_DATA } from "../actionsTypes";

const initialState = {
  data: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORS_DATA:
      return {
        ...state,
        data: action.data,
      };
    case CLEAN_AUTHORS_DATA:
      return {
        ...state,
        data: [],
      };
    default:
      return { ...state };
  }
};

export default reducer;
