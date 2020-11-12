import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AlbumPage from "./containers/AlbumPage/AlbumPage";
import HomePage from "./containers/HomePage/HomePage";
import TrackPage from "./containers/TrackPage/TrackPage";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:author" exact component={AlbumPage} />
        <Route path="/:author/:album" exact component={TrackPage} />
      </Switch>
    </Layout>
  );
};

export default App;
