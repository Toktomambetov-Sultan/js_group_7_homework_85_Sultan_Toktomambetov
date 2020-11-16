import React from "react";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import { Box, Container, Grid } from "@material-ui/core";
import AuthorizationPage from "../AuthorizationPage/AuthorizationPage";

const HomePage = () => {
  return (
    <Container>
      <Box pt={10}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <RegistrationPage />
          </Grid>
          <Grid item xs={12} md={6}>
            <AuthorizationPage />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
