import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

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

const TrackItem = ({ track }) => {
  const classes = useStyle();
  return (
    <div className={classes.item}>
      <div>
        Name: <Typography variant="h6">{track.name}</Typography>
      </div>
      <div>
        Lasting: <Typography variant="h6">{track.lasting} min.</Typography>
      </div>
      <div>
        Nuber: <Typography variant="h6">{track.count}</Typography>
      </div>
    </div>
  );
};

export default TrackItem;
