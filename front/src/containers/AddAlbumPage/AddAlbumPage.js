import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {
  initCurrentAlbum,
  postAlbumData,
  setCurrentAlbum,
} from "../../store/album/albumsActions";
import {
  cleanAuthorsData,
  getAuthorsData,
} from "../../store/author/authorAction";

const AddAlbumPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.music);
  const authorState = useSelector((state) => state.author);
  const currentAlbumData = useSelector((state) => state.album.current);

  useEffect(() => {
    dispatch(getAuthorsData("published=true"));
    dispatch(initCurrentAlbum());

    return () => dispatch(cleanAuthorsData());
  }, [dispatch]);

  const postAlbumDataHandler = (data) => dispatch(postAlbumData(data));

  const onFormSubmit = (event) => {
    event.preventDefault();
    postAlbumDataHandler(currentAlbumData);
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
      setCurrentAlbum({
        [name]: value,
      })
    );
  };
  return (
    <AlbumForm
      album={currentAlbumData}
      onChange={onFormChange}
      onSubmit={onFormSubmit}
      authors={authorState.data}
      error={state.error?.errors}
    />
  );
};

export default AddAlbumPage;
