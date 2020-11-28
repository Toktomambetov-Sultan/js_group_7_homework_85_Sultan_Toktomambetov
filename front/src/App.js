import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import AlbumPage from "./containers/AlbumPage/AlbumPage";
import AuthorPage from "./containers/AuthorPage/AuthorPage";
import HomePage from "./containers/HomePage/HomePage";
import TrackHistoryPage from "./containers/TrackHistoryPage/TrackHistoryPage";
import TrackPage from "./containers/TrackPage/TrackPage";
import AddAuthorPage from "./containers/AddAuthorPage/AddAuthorPage";
import AddAlbumPage from "./containers/AddAlbumPage/AddAlbumPage";
import AddTrackPage from "./containers/AddTrackPage/AddTrackPage";

const CustomRoute = (props) => {
  const user = useSelector((state) => state.user.user);
  if (user?.token) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />

        <CustomRoute path="/music/" exact component={AuthorPage} />
        <CustomRoute path="/add_author" exact component={AddAuthorPage} />
        <CustomRoute path="/add_album" exact component={AddAlbumPage} />
        <CustomRoute path="/add_track" exact component={AddTrackPage} />
        <CustomRoute path="/music/:author" exact component={AlbumPage} />
        <CustomRoute path="/music/:author/:album" exact component={TrackPage} />
        <CustomRoute path="/track_history" exact component={TrackHistoryPage} />

        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
