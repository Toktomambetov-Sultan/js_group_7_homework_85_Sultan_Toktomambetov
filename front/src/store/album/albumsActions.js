import { push } from "connected-react-router";
import axiosOrder from "../../axiosOrder";
import {
  CHANGE_CURRENT_ALBUM,
  CLEAN_ALBUMS_DATA,
  SET_ALBUMS_DATA,
} from "../actionsTypes";
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
export const setCurrentAlbum = (data) => {
  return {
    type: CHANGE_CURRENT_ALBUM,
    data,
  };
};

export const getAlbumsData = (search = "") => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const response = await axiosOrder.get(`albums?${search}`, { headers });
      dispatch(setData(response.data));
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error));
    }
  };
};

export const postAlbumData = (data) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      await axiosOrder.post("/albums", formData, { headers });
      dispatch(fetchMusicSuccess());
      dispatch(push("/music/"));
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};

export const initCurrentAlbum = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      const authorsResponse = await axiosOrder.get("authors?published=true", {
        headers,
      });

      dispatch(
        setCurrentAlbum({
          author: authorsResponse.data[0]?._id,
        })
      );
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};

export const acceptAlbumData = (id) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const authorId = getState().music.parentData.author._id;
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.post("albums/accept", { id }, { headers });
      const response = await axiosOrder.get(`albums?author=${authorId}`, {
        headers,
      });
      dispatch(setData(response.data));
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};

export const deleteAlbumData = (id) => {
  return async (dispatch, getState) => {
    dispatch(fetchMusicRequest());
    try {
      const authorId = getState().music.parentData.author._id;
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.delete("albums", {
        data: { id },
        headers,
      });
      const response = await axiosOrder.get(`albums?author=${authorId}`, {
        headers,
      });
      dispatch(setData(response.data));
      dispatch(fetchMusicSuccess());
    } catch (error) {
      dispatch(fetchMusicError(error.response?.data));
    }
  };
};
