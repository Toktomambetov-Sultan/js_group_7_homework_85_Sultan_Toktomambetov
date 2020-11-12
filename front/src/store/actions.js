import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_ERROR,
  SET_CURRENT_DATA,
  SET_PARENT_DATA,
} from "./actionsTypes";
import axiosOrder from "../axiosOrder";

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};

const fetchError = () => {
  return { type: FETCH_ERROR };
};

const fetchSuccess = () => {
  return { type: FETCH_SUCCESS };
};
const setCurrentData = (data) => {
  return { type: SET_CURRENT_DATA, data };
};

const setParentDataAction = (data) => {
  return { type: SET_PARENT_DATA, data };
};

export const getData = (search) => {
  return async (dispatch) => {
    dispatch(fetchRequest);
    try {
      console.log(search);
      const response = await axiosOrder.get(search);
      dispatch(setCurrentData(response.data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
export const setParentData = (params) => {
  return async (dispatch) => {
    dispatch(fetchRequest);
    try {
      let search;
      if (params.album) {
        search = "albums?_id=" + params.album;
      } else if (params.author) {
        search = "authors?_id=" + params.author;
      } else {
        return;
      }
      const response = await axiosOrder.get(search);
      dispatch(setParentDataAction(response.data[0]));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
