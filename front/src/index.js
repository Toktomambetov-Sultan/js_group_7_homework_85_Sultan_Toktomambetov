import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import musicReducer from "./store/music/musicReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from "connected-react-router";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  music: musicReducer,
  router: connectRouter(history),
});

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(rootReducer, applyMiddleware(...middleware));

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
