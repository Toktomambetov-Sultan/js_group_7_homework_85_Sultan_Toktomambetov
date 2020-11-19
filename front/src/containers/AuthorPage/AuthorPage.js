import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthorItem from "../../components/AuthorItem/AuthorItem";
import config from "../../config";
import { getAuthorsData } from "../../store/author/authorAction";
import { setParentData } from "../../store/music/musicActions";

const Page = (props) => {
  const state = useSelector((state) => state.author);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorsData("authors"));
    dispatch(setParentData());
  }, [dispatch]);

  const onClick = (id) => {
    props.history.push({ pathname: `${config.localUrls.music}/${id}` });
  };
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch">
        {state.data.map((author) => (
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

export default Page;
