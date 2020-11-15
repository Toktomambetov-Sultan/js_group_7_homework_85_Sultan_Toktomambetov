import { AppBar, Box, Container, Toolbar } from "@material-ui/core";
import React from "react";

const Layout = ({ children }) => {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            asd
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
