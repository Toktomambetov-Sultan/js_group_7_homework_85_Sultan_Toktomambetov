import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import config from "../../config";
import { useSelector } from "react-redux";
import ButtonsForAdmin from "../ButtonsForAdmin/ButtonsForAdmin";

const useStyle = makeStyles((theme) => ({
  item: {
    margin: "20px",
    width: "333px",
  },
  button: {
    flexGrow: "1",
    maxWidth: "400px",
    textTransform: "inherit",
  },
  image: {
    width: "300px",
    height: "auto",
    maxHeight: "300px",
  },
}));

const AlbumItem = ({ album, onClick, onDelete, onAccept }) => {
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
        color="primary"
        onClick={onClick}
        variant="outlined"
        className={classes.button}
      >
        <Grid container direction="column">
          <Grid item>
            Name: <Typography variant="h6">{album.name}</Typography>
          </Grid>
          <Grid item>
            Year: <Typography variant="h6">{album.year}</Typography>
          </Grid>
          <Grid item>
            {album.image && (
              <img
                className={classes.image}
                alt={album.name}
                src={config.ImageUrl + album.image}
              />
            )}
          </Grid>
        </Grid>
      </Button>
      {user?.role === "admin" && (
        <ButtonsForAdmin obj={album} onDelete={onDelete} onAccept={onAccept} />
      )}
    </Grid>
  );
};

export default AlbumItem;
