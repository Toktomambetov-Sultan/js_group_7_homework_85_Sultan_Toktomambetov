import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlbumItem from "../../components/AlbumItem/AlbumItem";
import config from "../../config";
import {
  cleanAlbumsData,
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
  const onClick = (id) => {
    props.history.push({
      pathname: `${config.localUrls.music}/${props.match.params.author}/${id}`,
    });
  };
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch" spacing={1}>
        {state.data.map((album) => (
          <AlbumItem
            key={album._id}
            album={album}
            onClick={() => onClick(album._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default AlbumPage;
