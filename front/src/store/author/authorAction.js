import axiosOrder from "../../axiosOrder";
import { CLEAN_AUTHORS_DATA, SET_AUTHORS_DATA } from "../actionsTypes";
import {
  fetchMusicRequest,
  fetchMusicSuccess,
  fetchMusicError,
} from "../music/musicActions";

const setData = (data) => {
  return { type: SET_AUTHORS_DATA, data };
};

export const cleanAuthorsData = () => {
  return {
    type: CLEAN_AUTHORS_DATA,
  };
};

export const getAuthorsData = (search) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const response = await axiosOrder.get(search, { headers });
      dispatch(setData(response.data));
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error));
    }
  };
};

export const postAuthorData = (data) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.post("/authors", data, { headers });
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error));
    }
  };
};
