import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParentData } from "../../store/music/musicActions";
import MusicNavigation from "../MusicNavigation/MusicNavigation";
import { Link } from "react-router-dom";
import { logOut } from "../../store/user/userActions";

const parseMusicTree = (data) => {
  const list = [];
  if (data.album) {
    list.push(
      { path: "", title: data.album.author.name },

      { path: `${data.album.author._id}`, title: data.album.name },
      {
        path: `${data.album.author._id}/${data.album._id}`,
        title: "Tracks",
      }
    );
  } else if (data.author) {
    list.push(
      { path: "", title: data.author.name },
      { path: `${data.author._id}`, title: "Albums" }
    );
  } else {
    list.push({
      path: "",
      title: "Authors",
    });
  }
  return list;
};

const Layout = ({ children }) => {
  const state = useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    Object.keys(state.pageParams).length &&
      dispatch(setParentData(state.pageParams));
  }, [dispatch, state.pageParams]);
  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Grid container justify="space-between" alignItems="center">
              <Typography variant="h4">Music App</Typography>
              <MusicNavigation paths={parseMusicTree(state.parentData)} />
              <Box
                component={Link}
                to="/track_history"
                style={{ textDecoration: "none" }}
                color="white"
              >
                Track history
              </Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={logOutHandler}
              >
                Log out
              </Button>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" paddingTop="5px">
        <Container>{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
