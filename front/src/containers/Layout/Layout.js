import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AlbumIcon from "@material-ui/icons/Album";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { setParentData } from "../../store/music/musicActions";
import { logOut } from "../../store/user/userActions";
import UserPanel from "./UserPanel/UserPanel";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  displayName: {
    margin: "5px",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const state = useSelector((state) => state.music);
  const user = useSelector((state) => state.user.user);
  const [openDrawer, setOpenDrawer] = useState(user?.token);
  const dispatch = useDispatch();
  useEffect(() => {
    Object.keys(state.pageParams).length &&
      dispatch(setParentData(state.pageParams));
  }, [dispatch, state.pageParams]);
  const logOutHandler = () => {
    setOpenDrawer(false);
    dispatch(logOut());
  };
  const changeOpenDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar component={Box} position="static" pb={2}>
        <Toolbar>
          <Container>
            <Grid container direction="column">
              <Grid item container justify="space-between" alignItems="center">
                <Typography variant="h4">Music App</Typography>
                {user?.token && (
                  <div>
                    <Grid container alignItems="center" direction="row">
                      <Avatar
                        alt="person image"
                        src={user?.avatarImage || config.usersData.defaultImg}
                      />
                      <Typography className={classes.displayName} variant="h6">
                        {user?.displayName}
                      </Typography>
                    </Grid>
                  </div>
                )}
                <IconButton
                  onClick={changeOpenDrawer}
                  size="medium"
                  color="secondary"
                  disabled={!user?.token}
                >
                  <AlbumIcon />
                  Music
                </IconButton>

                {user?.token && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={logOutHandler}
                    >
                      Log out
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item>
                <UserPanel open={openDrawer} />
              </Grid>
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
