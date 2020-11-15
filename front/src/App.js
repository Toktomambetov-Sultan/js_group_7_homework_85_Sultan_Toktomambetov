import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AlbumPage from "./containers/AlbumPage/AlbumPage";
import AuthorPage from "./containers/AuthorPage/AuthorPage";
import TrackPage from "./containers/TrackPage/TrackPage";

const App = () => {
  return (
    <Layout>
      <Switch>
        {/* <Route path="/" /> */}
        <Route path="/music/" exact component={AuthorPage} />
        <Route path="/music/:author" exact component={AlbumPage} />
        <Route path="/music/:author/:album" exact component={TrackPage} />
      </Switch>
    </Layout>
  );
};

export default App;
