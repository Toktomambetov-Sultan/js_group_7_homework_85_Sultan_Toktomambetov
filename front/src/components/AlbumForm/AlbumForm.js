import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
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

const AlbumForm = ({ onSubmit, onChange, error, album, authors }) => {
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
        <Typography variant="h5">Add new album</Typography>
        <form onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            className={classes.top}
            error={!!error?.name}
            label={error?.name?.message || "Name"}
            name="name"
            required
            autoFocus
            value={album.name}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            className={classes.top}
            error={!!error?.year}
            label={error?.year?.message || "Year"}
            name="year"
            autoFocus
            type="number"
            value={album.year}
            onChange={onChange}
          />
          <div className={classes.Bottom}>
            <div className={classes.fileUploader}>
              <FileUploader
                name="image"
                required
                onChange={onChange}
                error={!!error?.image}
                label={error?.image?.message || "image"}
              />
            </div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="authors-select">Author</InputLabel>
              <Select
                native
                onChange={onChange}
                label="Author"
                className={classes.select}
                defaultValue={authors[0]?._id}
                inputProps={{
                  name: "author",
                  id: "authors-select",
                }}
              >
                {authors.map((author) => (
                  <option value={author._id} key={author._id}>
                    {author.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>

          <Box marginTop={2} width="300px" display="inline-block">
            <Button
              type="submit"
              disabled={!authors.length}
              fullWidth
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AlbumForm;
