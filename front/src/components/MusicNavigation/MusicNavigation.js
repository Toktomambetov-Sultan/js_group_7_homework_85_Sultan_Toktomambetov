import { Breadcrumbs, Link as Mlink, Box } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";

const MusicNavigation = ({ paths }) => {
  return (
    <Breadcrumbs component={Box} color="#fff" aria-label="breadcrumb">
      {paths.map((path) => (
        <Mlink
          key={path.path}
          color="inherit"
          component={Link}
          to={`${config.localUrls.music}/${path.path}`}
        >
          {String(path.title)}
        </Mlink>
      ))}
    </Breadcrumbs>
  );
};

export default MusicNavigation;
