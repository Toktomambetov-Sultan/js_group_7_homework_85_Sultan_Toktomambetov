import {
  Breadcrumbs,
  CssBaseline,
  Grid,
  Link as Mlink,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrackItem from "../../components/TrackItem/TrackItem";
import { getData, setParentData } from "../../store/actions";

const TrackPage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("/tracks?album=" + props.match.params.album));
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
          {String(state.parentData?.author?.name)}
        </Mlink>
        <Mlink
          color="inherit"
          component={Link}
          to={"/" + props.match.params.author}
        >
          {String(state.parentData?.name)}
        </Mlink>
        <Mlink
          color="inherit"
          component={Link}
          to={"/" + props.match.params.author + "/" + props.match.params.album}
        >
          Tracks
        </Mlink>
      </Breadcrumbs>
      <Grid container alignItems="stretch" spacing={1}>
        {state.currentData.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            onClick={() => onClick(track._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default TrackPage;
