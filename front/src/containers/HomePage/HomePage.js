import {
  Breadcrumbs,
  CssBaseline,
  Grid,
  Link as Mlink,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthorItem from "../../components/AuthorItem/AuthorItem";
import { getData, setParentData } from "../../store/actions";

const HomePage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("authors"));
    dispatch(setParentData());
  }, [dispatch]);

  const onClick = (id) => {
    props.history.push({ pathname: "/" + id });
  };
  return (
    <div>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Mlink color="inherit" component={Link} to="/">
          Authors
        </Mlink>
      </Breadcrumbs>
      <Grid container alignItems="stretch">
        {state.currentData.map((author) => (
          <AuthorItem
            key={author._id}
            author={author}
            onClick={() => onClick(author._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
