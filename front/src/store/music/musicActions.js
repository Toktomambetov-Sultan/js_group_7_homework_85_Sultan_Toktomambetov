import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_ERROR,
  SET_CURRENT_DATA,
  SET_PARENT_DATA,
  SET_PAGE_PARAMS,
} from "../actionsTypes";
import axiosOrder from "../../axiosOrder";

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

export const setPageParams = (props) => {
  return {
    type: SET_PAGE_PARAMS,
    params: props.match.params,
  };
};

export const getData = (search) => {
  return async (dispatch) => {
    dispatch(fetchRequest);
    try {
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
      if (!params) {
        dispatch(setParentDataAction({}));
        return;
      }
      if (params.album) {
        search = "albums?_id=" + params.album;
      } else if (params.author) {
        search = "authors?_id=" + params.author;
      }
      const response = await axiosOrder.get(search);
      const data = dispatch(
        setParentDataAction({
          [params.album ? "album" : "author"]: response.data[0],
        })
      );
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
