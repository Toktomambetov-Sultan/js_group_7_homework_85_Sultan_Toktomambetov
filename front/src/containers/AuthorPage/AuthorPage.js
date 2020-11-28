import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthorItem from "../../components/AuthorItem/AuthorItem";
import config from "../../config";
import {
  cleanAuthorsData,
  getAuthorsData,
  acceptAuthorData,
  deleteAuthorData,
} from "../../store/author/authorAction";
import { setParentData } from "../../store/music/musicActions";

const Page = (props) => {
  const state = useSelector((state) => state.author);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorsData());
    dispatch(setParentData());
    return () => dispatch(cleanAuthorsData());
  }, [dispatch]);

  const acceptAuthorDataHandler = (id) => dispatch(acceptAuthorData(id));
  const deleteAuthorDataHandler = (id) => dispatch(deleteAuthorData(id));

  const onClick = (id) => {
    props.history.push({ pathname: `${config.localUrls.music}/${id}` });
  };

  const onDelete = (id) => {
    deleteAuthorDataHandler(id);
  };
  const onAccept = (id) => {
    acceptAuthorDataHandler(id);
  };
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch">
        {state.data.map((author) => (
          <AuthorItem
            key={author._id}
            author={author}
            onDelete={() => onDelete(author._id)}
            onAccept={() => onAccept(author._id)}
            onClick={() => onClick(author._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Page;
