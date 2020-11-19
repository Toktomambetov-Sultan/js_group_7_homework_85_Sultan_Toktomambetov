const { SET_ALBUMS_DATA } = require("../actionsTypes");

const initialState = {
  data: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
