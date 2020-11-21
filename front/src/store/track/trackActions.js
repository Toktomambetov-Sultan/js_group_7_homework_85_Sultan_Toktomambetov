import axiosOrder from "../../axiosOrder";
import { CLEAN_TRACKS_DATA, SET_TRACKS_DATA } from "../actionsTypes";
import {
  fetchMusicRequest,
  fetchMusicSuccess,
  fetchMusicError,
} from "../music/musicActions";

const setData = (data) => {
  return { type: SET_TRACKS_DATA, data };
};

export const cleanTracksData = () => {
  return {
    type: CLEAN_TRACKS_DATA,
  };
};

export const getTracksData = (search) => {
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
