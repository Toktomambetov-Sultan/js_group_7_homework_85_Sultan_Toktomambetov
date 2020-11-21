import axiosOrder from "../../axiosOrder";
import { CLEAN_ALBUMS_DATA, SET_ALBUMS_DATA } from "../actionsTypes";
import {
  fetchMusicRequest,
  fetchMusicSuccess,
  fetchMusicError,
} from "../music/musicActions";

const setData = (data) => {
  return { type: SET_ALBUMS_DATA, data };
};

export const cleanAlbumsData = () => {
  return {
    type: CLEAN_ALBUMS_DATA,
  };
};

export const getAlbumsData = (search) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest);
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
