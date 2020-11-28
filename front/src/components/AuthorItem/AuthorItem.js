import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import config from "../../config";

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
  buttons: {
    marginTop: "auto",
  },
  image: {
    width: "300px",
    height: "auto",
    maxHeight: "300px",
  },
}));

const AuthorItem = ({ author, onClick, onAccept, onDelete }) => {
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
      {user?.role === "admin" && (
        <Grid
          container
          item
          className={classes.buttons}
          direction="row"
          justify="space-between"
          wrap="nowrap"
        >
          {!author.published && (
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={onAccept}
            >
              accept
            </Button>
          )}
          <Button
            color="secondary"
            fullWidth
            variant="contained"
            onClick={onDelete}
          >
            delete
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default AuthorItem;
