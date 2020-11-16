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
import config from "../../config";
import {
  getData,
  setPageParams,
  setParentData,
} from "../../store/music/musicActions";

const AuthorPage = (props) => {
  const state = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("authors"));
    dispatch(setParentData());
    dispatch(setPageParams(props));
  }, [dispatch]);

  const onClick = (id) => {
    props.history.push({ pathname: `${config.localUrls.music}/${id}` });
  };
  return (
    <div>
      <CssBaseline />
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

export default AuthorPage;
