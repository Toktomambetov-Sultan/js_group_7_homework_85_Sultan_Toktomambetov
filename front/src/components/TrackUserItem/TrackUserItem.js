import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  item: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    textTransform: "inherit",
    margin: "10px",
    padding: "5px",
    border: "2px solid blue",
    borderRadius: "5px",
  },
}));

const TrackUserItem = ({ track }) => {
  const classes = useStyle();
  return (
    <div className={classes.item}>
      <div>
        Author Name:{" "}
        <Typography variant="h6">{track.track.album.author.name}</Typography>
      </div>
      <div>
        Name: <Typography variant="h6">{track.track.name}</Typography>
      </div>
      <div>
        Datetime:
        <Typography variant="h6">
          {moment(track.__datetime).format("DD MMM HH:mm:ss")}
        </Typography>
      </div>
    </div>
  );
};
export default TrackUserItem;
