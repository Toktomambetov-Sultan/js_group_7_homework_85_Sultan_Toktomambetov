import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrackUserItem from "../../components/TrackUserItem/TrackUserItem";
import {
  cleanTrackList,
  getTrackList,
} from "../../store/trackHistory/trackHistoryActions";

const TrackHistoryPage = () => {
  const state = useSelector((state) => state.trackHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrackList());
    return () => dispatch(cleanTrackList());
  }, [dispatch]);
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch" spacing={1}>
        {state.trackList.map((track) => (
          <TrackUserItem key={track._id} track={track} />
        ))}
      </Grid>
    </div>
  );
};

export default TrackHistoryPage;
