import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  buttons: {
    marginTop: "auto",
  },
}));

const ButtonsForAdmin = ({ onDelete, onAccept, obj }) => {
  const classes = useStyle();
  return (
    <Grid
      container
      item
      className={classes.buttons}
      direction="row"
      justify="space-between"
      wrap="nowrap"
    >
      {!obj.published && (
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
  );
};

export default ButtonsForAdmin;
