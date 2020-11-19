import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_ERROR,
  SET_PARENT_DATA,
} from "../actionsTypes";
import axiosOrder from "../../axiosOrder";

export const fetchMusicRequest = () => {
  return { type: FETCH_REQUEST };
};

export const fetchMusicError = (error) => {
  return { type: FETCH_ERROR, error };
};

export const fetchMusicSuccess = () => {
  return { type: FETCH_SUCCESS };
};

const setParentDataAction = (data) => {
  return { type: SET_PARENT_DATA, data };
};

export const setParentData = (params) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest);
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
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const response = await axiosOrder.get(search, { headers });
      dispatch(
        setParentDataAction({
          [params.album ? "album" : "author"]: response.data[0],
        })
      );
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error));
    }
  };
};
