import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import config from "../../config";

const useStyle = makeStyles((theme) => ({
  item: {
    maxWidth: "400px",
    height: "100%",
    textTransform: "inherit",
  },
  image: {
    width: "300px",
    height: "auto",
    maxHeight: "300px",
  },
}));

const AlbumItem = ({ album, onClick }) => {
  const classes = useStyle();
  return (
    <Grid item>
      <Button
        color="primary"
        onClick={onClick}
        variant="outlined"
        className={classes.item}
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
    </Grid>
  );
};

export default AlbumItem;
