import {
  Breadcrumbs,
  CssBaseline,
  Grid,
  Link as Mlink,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import { getData, setParentData } from "../../store/actions";

const AlbumPage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("/albums?author=" + props.match.params.author));
    dispatch(setParentData(props.match.params));
  }, [dispatch, props.match.params]);
  const onClick = (id) => {
    props.history.push({
      pathname: "/" + props.match.params.author + "/" + id,
    });
  };

  return (
    <div>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Mlink color="inherit" component={Link} to="/">
          {String(state.parentData?.name)}
        </Mlink>
        <Mlink color="inherit" component={Link} to={props.match.params.author}>
          Albums
        </Mlink>
      </Breadcrumbs>
      <Grid container alignItems="stretch" spacing={1}>
        {state.currentData.map((album) => (
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
