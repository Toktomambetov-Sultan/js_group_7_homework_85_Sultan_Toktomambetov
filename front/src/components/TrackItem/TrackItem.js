import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  item: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "inherit",
    margin: "10px",
    padding: "5px",
    color: "#000",
  },
}));

const TrackItem = ({ track, onClick }) => {
  const classes = useStyle();
  return (
    <Button
      className={classes.item}
      fullWidth
      color="primary"
      variant="outlined"
      onClick={onClick}
    >
      <div>
        Name: <Typography variant="h6">{track.name}</Typography>
      </div>
      <div>
        Lasting: <Typography variant="h6">{track.lasting} min.</Typography>
      </div>
      <div>
        Nuber: <Typography variant="h6">{track.count}</Typography>
      </div>
    </Button>
  );
};

export default TrackItem;
