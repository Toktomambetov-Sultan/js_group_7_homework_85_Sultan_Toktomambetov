import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_ERROR,
  SET_PARENT_DATA,
} from "../actionsTypes";

const initialState = {
  parentData: {},
  pageParams: {},
  isLoading: false,
  error: null,
};
const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SET_PARENT_DATA:
      return {
        ...state,
        parentData: { ...action.data },
      };
    default:
      return { ...state };
  }
};

export default musicReducer;
