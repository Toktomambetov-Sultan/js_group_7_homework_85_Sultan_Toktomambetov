import React from "react";
import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import FileUploader from "../UI/FileUploader/FileUploader";

const useStyles = makeStyles((theme) => ({
  top: {
    marginBottom: "30px",
    width: "500px",
  },
  Bottom: {
    padding: "30px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileUploader: {
    maxWidth: "500px",
  },
  select: {
    minWidth: "300px",
  },
}));

const AuthorForm = ({ onSubmit, onChange, error, author }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <Box
        textAlign="center"
        bgcolor="#fff"
        margin={1}
        padding={1}
        borderRadius={10}
      >
        <Typography variant="h5">Add new author</Typography>
        <form onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            className={classes.top}
            error={!!error?.name}
            label={error?.name?.message || "Name"}
            name="name"
            autoFocus
            value={author.name}
            onChange={onChange}
          />
          <div className={classes.Bottom}>
            <div className={classes.fileUploader}>
              <FileUploader
                name="image"
                onChange={onChange}
                error={!!error?.image}
                label={error?.image?.message || "image"}
              />
            </div>
          </div>

          <Box marginTop={2} width="300px" display="inline-block">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AuthorForm;
