import { push } from "connected-react-router";
import axiosOrder from "../../axiosOrder";
import {
  CHANGE_CURRENT_TRACK,
  CLEAN_TRACKS_DATA,
  SET_TRACKS_DATA,
} from "../actionsTypes";
import {
  fetchMusicRequest,
  fetchMusicSuccess,
  fetchMusicError,
} from "../music/musicActions";

const setData = (data) => {
  return { type: SET_TRACKS_DATA, data };
};

export const setCurrentTrack = (data) => {
  return {
    type: CHANGE_CURRENT_TRACK,
    data,
  };
};

export const cleanTracksData = () => {
  return {
    type: CLEAN_TRACKS_DATA,
  };
};

export const getTracksData = (search) => {
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

export const postTrackData = (data) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.post("/tracks", data, { headers });
      dispatch(fetchMusicSuccess());
      dispatch(push("/music"));
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};

export const initCurrentTrack = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const authorsResponse = await axiosOrder.get("/authors?published=true", {
        headers,
      });
      const albumsResponse =
        authorsResponse.data[0]?._id &&
        (await axiosOrder(
          "/albums?author=" + authorsResponse.data[0]?._id + "&published=true",
          {
            headers,
          }
        ));
      const album = albumsResponse?.data[0];
      dispatch(
        setCurrentTrack({
          album: album?._id,
          author: album?.author._id,
        })
      );
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};

export const acceptTrackData = (id) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const albumId = getState().music.parentData.album._id;
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.post("tracks/accept", { id }, { headers });
      const response = await axiosOrder.get("tracks?album=" + albumId, {
        headers,
      });
      dispatch(setData(response.data));
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};

export const deleteTrackData = (id) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const albumId = getState().music.parentData.album._id;
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.delete("tracks", {
        data: { id },
        headers,
      });
      const response = await axiosOrder.get("tracks?album=" + albumId, {
        headers,
      });
      dispatch(setData(response.data));
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};
