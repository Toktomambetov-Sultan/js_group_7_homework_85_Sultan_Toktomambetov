import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import { postAlbumData } from "../../store/album/albumsActions";
import { getAuthorsData } from "../../store/author/authorAction";

const AddAlbumPage = () => {
  const [currentAlbumData, setCurrentAlbumData] = useState({
    name: "",
    year: "",
    image: null,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.music);
  const authorState = useSelector((state) => state.author);

  useEffect(() => {
    dispatch(getAuthorsData());
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
    setCurrentAlbumData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
