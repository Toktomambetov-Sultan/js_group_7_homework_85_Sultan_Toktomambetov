import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlbumItem from "../../components/AlbumItem/AlbumItem";
import config from "../../config";
import {
  acceptAlbumData,
  cleanAlbumsData,
  deleteAlbumData,
  getAlbumsData,
} from "../../store/album/albumsActions";
import { setParentData } from "../../store/music/musicActions";

const AlbumPage = (props) => {
  const state = useSelector((state) => state.album);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumsData("author=" + props.match.params.author));
    dispatch(setParentData(props.match.params));
    return () => dispatch(cleanAlbumsData());
  }, [dispatch, props.match.params, props]);

  const deleteAlbumDataHandler = (id) => dispatch(deleteAlbumData(id));

  const acceptAlbumDataHandler = (id) => dispatch(acceptAlbumData(id));

  const onClick = (id) => {
    props.history.push({
      pathname: `${config.localUrls.music}/${props.match.params.author}/${id}`,
    });
  };

  const onDelete = (id) => {
    deleteAlbumDataHandler(id);
  };
  const onAccept = (id) => {
    acceptAlbumDataHandler(id);
  };
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch">
        {state.data.map((album) => (
          <AlbumItem
            key={album._id}
            album={album}
            onDelete={() => onDelete(album._id)}
            onAccept={() => onAccept(album._id)}
            onClick={() => onClick(album._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default AlbumPage;
