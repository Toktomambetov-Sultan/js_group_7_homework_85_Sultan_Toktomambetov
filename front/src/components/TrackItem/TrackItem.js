import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ButtonsForAdmin from "../ButtonsForAdmin/ButtonsForAdmin";

const useStyle = makeStyles((theme) => ({
  item: {
    margin: "10px",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px",
    color: "#000",
    flexGrow: "1",
    textTransform: "inherit",
  },
  buttons: {
    marginTop: "auto",
  },
  image: {
    width: "300px",
    height: "auto",
    maxHeight: "300px",
  },
}));

const TrackItem = ({ track, onClick, onDelete, onAccept }) => {
  const classes = useStyle();
  const user = useSelector((state) => state.user.user);
  return (
    <Grid
      item
      container
      className={classes.item}
      direction="column"
      justify="space-between"
    >
      <Button
        className={classes.button}
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
      {user?.role === "admin" && (
        <ButtonsForAdmin obj={track} onDelete={onDelete} onAccept={onAccept} />
      )}
    </Grid>
  );
};

export default TrackItem;
