import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthorItem from "../../components/AuthorItem/AuthorItem";
import config from "../../config";
import { getData, setParentData } from "../../store/music/musicActions";

const Page = (props) => {
  const state = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("authors"));
    dispatch(setParentData());
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

export default Page;
