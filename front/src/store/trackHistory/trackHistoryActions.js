import { FETCH_T_ERROR, SET_TRACK_LIST } from "../actionsTypes";
import axiosOrder from "./../../axiosOrder";
const setTrackList = (data) => {
  return {
    type: SET_TRACK_LIST,
    data,
  };
};
const fetchError = (error) => {
  return {
    type: FETCH_T_ERROR,
    error,
  };
};

export const getTrackList = () => {
  return async (dispatch, getState) => {
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const response = await axiosOrder.get("/track_history", { headers });
      dispatch(setTrackList(response.data));
    } catch (error) {
      fetchError(error);
    }
  };
};

export const addTrack = (id) => {
  return async (dispatch, getState) => {
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };

      await axiosOrder.post("/track_history", { track: id }, { headers });
    } catch (error) {
      fetchError(error);
    }
  };
};

export const cleanTrackList = () => {
  return {
    type: SET_TRACK_LIST,
    data: [],
  };
};
