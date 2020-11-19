import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AlbumPage from "./containers/AlbumPage/AlbumPage";
import AuthorPage from "./containers/AuthorPage/AuthorPage";
import HomePage from "./containers/HomePage/HomePage";
import TrackHistoryPage from "./containers/TrackHistoryPage/TrackHistoryPage";
import TrackPage from "./containers/TrackPage/TrackPage";

const App = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {user?.token && (
          <>
            <Route path="/music/" exact component={AuthorPage} />
            <Route path="/music/:author" exact component={AlbumPage} />
            <Route path="/music/:author/:album" exact component={TrackPage} />
            <Route path="/track_history" exact component={TrackHistoryPage} />
          </>
        )}
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
