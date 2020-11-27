import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParentData } from "../../store/music/musicActions";

import AlbumIcon from "@material-ui/icons/Album";
import { logOut } from "../../store/user/userActions";
import UserPanel from "./UserPanel/UserPanel";

const Layout = ({ children }) => {
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
      <AppBar component={Box} position="static" pb={2}>
        <Toolbar>
          <Container>
            <Grid container direction="column">
              <Grid item container justify="space-between" alignItems="center">
                <Typography variant="h4">Music App</Typography>
                <IconButton
                  onClick={changeOpenDrawer}
                  size="medium"
                  color="secondary"
                  disabled={!user?.token}
                >
                  <AlbumIcon />
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
