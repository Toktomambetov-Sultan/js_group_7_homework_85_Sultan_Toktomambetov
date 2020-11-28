import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrackForm from "../../components/TrackForm/TrackForm";
import {
  cleanAlbumsData,
  getAlbumsData,
} from "../../store/album/albumsActions";
import {
  cleanAuthorsData,
  getAuthorsData,
} from "../../store/author/authorAction";
import {
  initCurrentTrack,
  postTrackData,
  setCurrentTrack,
} from "../../store/track/trackActions";

const AddTrackPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.music);
  const authorState = useSelector((state) => state.author);
  const albumState = useSelector((state) => state.album);
  const currentTrackData = useSelector((state) => state.track.current);
  useEffect(() => {
    dispatch(initCurrentTrack());
    return () => {
      dispatch(cleanAuthorsData());
      dispatch(cleanAlbumsData());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuthorsData("published=true"));
    dispatch(getAlbumsData(`author=${currentTrackData.author}&published=true`));
  }, [dispatch, currentTrackData.author]);

  const postTrackDataHandler = (data) => dispatch(postTrackData(data));

  const onFormSubmit = (event) => {
    event.preventDefault();
    postTrackDataHandler(currentTrackData);
  };
  const onFormChange = (event) => {
    const { name } = event.target;
    let value;
    switch (name) {
      case "image":
        value = event.target.files[0];
        break;
      default:
        value = event.target.value;
    }
    dispatch(
      setCurrentTrack({
        [name]: value,
      })
    );
  };
  return (
    <TrackForm
      track={currentTrackData}
      onChange={onFormChange}
      onSubmit={onFormSubmit}
      authors={authorState.data}
      error={state.error?.errors}
      albums={albumState?.data}
    />
  );
};

export default AddTrackPage;
