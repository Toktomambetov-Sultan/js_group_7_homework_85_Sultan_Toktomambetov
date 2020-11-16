import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const UserForm = ({ title, icon, color, user }) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Box textAlign="center">
          <Avatar component={Box} margin="auto" bgcolor={color}>
            {icon}
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        </Box>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={user.name}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={user.password}
            autoComplete="current-password"
          />
          <Box pt="10px">
            <Button type="submit" fullWidth variant="contained" color="primary">
              {title}
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
};

export default UserForm;
