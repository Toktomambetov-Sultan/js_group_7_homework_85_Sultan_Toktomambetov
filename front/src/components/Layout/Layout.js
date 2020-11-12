import { Box, Container } from "@material-ui/core";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Box component={Container} pt={2}>
      {children}
    </Box>
  );
};

export default Layout;
