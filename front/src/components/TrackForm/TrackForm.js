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

const TrackForm = ({ onSubmit, onChange, error, track, albums, authors }) => {
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
        <Typography variant="h5">Add new track</Typography>
        <form onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            className={classes.top}
            error={!!error?.name}
            label={error?.name?.message || "Name"}
            name="name"
            autoFocus
            value={track.name}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            className={classes.top}
            error={!!error?.lasting}
            label={error?.lasting?.message || "Lasting"}
            name="lasting"
            autoFocus
            type="number"
            value={track.lasting}
            onChange={onChange}
          />
          <div className={classes.Bottom}>
            <FormControl variant="outlined">
              <InputLabel shrink htmlFor="authors-select">
                Author
              </InputLabel>
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
            <FormControl error={!!error?.album} variant="outlined">
              <InputLabel shrink={!!albums.length} htmlFor="albums-select">
                {error?.album?.message || "Album"}
              </InputLabel>
              <Select
                disabled={!albums.length}
                native
                onChange={onChange}
                label={error?.album?.message || "Album"}
                className={classes.select}
                defaultValue={albums[0]?._id}
                inputProps={{
                  name: "album",
                  id: "albums-select",
                }}
              >
                {albums.map((album) => (
                  <option value={album._id} key={album._id}>
                    {album.name}
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

export default TrackForm;
