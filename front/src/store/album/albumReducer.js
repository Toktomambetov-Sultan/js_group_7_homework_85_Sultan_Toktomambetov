const {
  SET_ALBUMS_DATA,
  CLEAN_ALBUMS_DATA,
  CHANGE_CURRENT_ALBUM,
} = require("../actionsTypes");

const initialState = {
  data: [],
  current: {
    author: null,
    image: null,
    name: "",
    year: "",
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS_DATA:
      return {
        ...state,
        data: action.data,
      };
    case CLEAN_ALBUMS_DATA:
      return {
        ...state,
        data: [],
      };
    case CHANGE_CURRENT_ALBUM:
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
