import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import config from "../../config";

const useStyle = makeStyles((theme) => ({
  item: {
    margin: "10px",
    display: "inline-block"
  },
  button: {
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

const AuthorItem = ({ author, onClick }) => {
  const classes = useStyle();
  return (
    <Grid item className={classes.item}>
      <Button
        color="primary"
        onClick={onClick}
        variant="outlined"
        className={classes.button}
      >
        <Grid container direction="column">
          <Grid item>
            Name: <Typography variant="h6">{author.name}</Typography>
          </Grid>
          <Grid item>
            {author.image && (
              <img
                className={classes.image}
                alt={author.name}
                src={config.ImageUrl + author.image}
              />
            )}
          </Grid>
        </Grid>
      </Button>
    </Grid>
  );
};

export default AuthorItem;
