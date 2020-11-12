import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_ERROR,
  SET_CURRENT_DATA,
  SET_PARENT_DATA,
} from "./actionsTypes";

const initialState = {
  currentData: [],
  parentData: {},
  isLoading: false,
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SET_CURRENT_DATA:
      return {
        ...state,
        currentData: action.data,
      };
    case SET_PARENT_DATA:
      return {
        ...state,
        parentData: action.data,
      };
    default:
      return { ...state };
  }
};

export default reducer;
