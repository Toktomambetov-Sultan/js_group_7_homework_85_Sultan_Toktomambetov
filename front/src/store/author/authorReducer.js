import { SET_AUTHORS_DATA } from "../actionsTypes";

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
    default:
      return { ...state };
  }
};

export default reducer;