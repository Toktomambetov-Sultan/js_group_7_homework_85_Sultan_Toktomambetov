import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrackItem from "../../components/TrackItem/TrackItem";
import { setParentData } from "../../store/music/musicActions";
import { addTrack } from "../../store/trackHistory/trackHistoryActions";
import {
  acceptTrackData,
  cleanTracksData,
  deleteTrackData,
  getTracksData,
} from "../../store/track/trackActions";

const TrackPage = (props) => {
  const state = useSelector((state) => state.track);
  const dispatch = useDispatch();

  const acceptTrackDataHandler = (id) => dispatch(acceptTrackData(id));
  const deleteTrackDataHandler = (id) => dispatch(deleteTrackData(id));

  useEffect(() => {
    dispatch(getTracksData("/tracks?album=" + props.match.params.album));
    dispatch(setParentData(props.match.params));
    return () => dispatch(cleanTracksData());
  }, [dispatch, props.match.params]);

  const onDelete = (id) => {
    deleteTrackDataHandler(id);
  };
  const onAccept = (id) => {
    acceptTrackDataHandler(id);
  };

  const onClick = (id) => {
    dispatch(addTrack(id));
  };
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch">
        {state.data.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            onClick={() => onClick(track._id)}
            onDelete={() => onDelete(track._id)}
            onAccept={() => onAccept(track._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default TrackPage;
